import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { LANDING_SHELF_SCRIPT } from "../src/landing-shelf-motion.js";

const { build } = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({ reduced = false, media = true, observer = true, raf = true, brokenObserver = false, brokenObserve = false, root = true, empty = false, legacyMedia = false, script = LANDING_SHELF_SCRIPT } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback, options) { this.events.set(name, { callback, options }); }
    removeEventListener(name, callback) { if (this.events.get(name)?.callback === callback) this.events.delete(name); }
    dispatch(name) { this.events.get(name)?.callback(); }
  }
  function element() {
    const classes = new Set();
    const properties = new Map();
    const result = { classes, properties, writes: 0 };
    result.classList = { add: (name) => classes.add(name), remove: (name) => classes.delete(name) };
    result.style = {
      setProperty(name, value) { properties.set(name, value); result.writes += 1; },
      removeProperty(name) { properties.delete(name); result.writes += 1; },
    };
    return result;
  }
  const value = { dataset: { valueFrom: "8500", valueTo: "15300" }, textContent: "153,00 €" };
  const invalidValue = { dataset: { valueFrom: "unknown", valueTo: "15300" }, textContent: "Eigene Sammlung" };
  const geometries = [
    { top: 100, height: 600 },
    { top: 700, height: 600 },
    { top: 1300, height: 600 },
  ];
  let reads = 0;
  const steps = geometries.map((geometry, index) => {
    const step = element();
    step.getBoundingClientRect = () => { reads += 1; return { ...geometry }; };
    step.querySelectorAll = () => index === 1 ? [value, invalidValue] : [];
    return step;
  });
  const shelf = element();
  shelf.querySelectorAll = () => empty ? [] : steps;
  const document = new Events();
  document.hidden = false;
  document.querySelector = () => root ? shelf : null;
  document.documentElement = { clientHeight: 900 };
  const preference = new Events();
  preference.matches = reduced;
  if (legacyMedia) {
    preference.addListener = (callback) => preference.events.set("change", { callback });
    preference.addEventListener = undefined;
  }
  const window = new Events();
  window.innerHeight = 900;
  if (media) window.matchMedia = () => preference;
  const frames = new Map();
  let nextFrame = 0;
  if (raf) {
    window.requestAnimationFrame = (callback) => { const id = nextFrame++; frames.set(id, callback); return id; };
    window.cancelAnimationFrame = (id) => frames.delete(id);
  }
  let intersection;
  let observerOptions;
  let disconnected = false;
  if (observer) window.IntersectionObserver = class {
    constructor(callback, options) {
      if (brokenObserver) throw new Error("unavailable");
      intersection = callback;
      observerOptions = options;
    }
    observe(target) {
      if (brokenObserve) throw new Error("cannot observe");
      assert.equal(target, shelf);
    }
    disconnect() { disconnected = true; }
  };
  vm.runInNewContext(script, { document, window, Intl });
  return {
    shelf, steps, value, invalidValue, geometries, window, document, preference, frames,
    get reads() { return reads; },
    get ready() { return shelf.classes.has("is-shelf-ready"); },
    get observerOptions() { return observerOptions; },
    get disconnected() { return disconnected; },
    progress(index) { return Number(steps[index].properties.get("--shelf-progress")); },
    selected() { return steps.findIndex((step) => step.classes.has("is-shelf-active")); },
    visible(value = true) { intersection?.([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    flush() { const callbacks = Array.from(frames.values()); frames.clear(); callbacks.forEach((callback) => callback()); },
  };
}

test("the shelf initializes only near the viewport and coalesces scroll work", () => {
  const s = scene();
  assert.equal(s.ready, false);
  assert.equal(s.reads, 0);
  assert.equal(s.frames.size, 0);
  assert.equal(s.observerOptions.rootMargin, "180px 0px");
  s.visible();
  assert.equal(s.frames.size, 1);
  assert.equal(s.ready, false, "do not opt into animated CSS before the first successful frame");
  assert.equal(s.window.events.get("scroll").options.passive, true);
  s.window.dispatch("scroll");
  s.window.dispatch("scroll");
  assert.equal(s.frames.size, 1);
  s.flush();
  assert.equal(s.ready, true);
  assert.equal(s.reads, 3);
  assert.equal(s.frames.size, 0, "no perpetual render loop");
  assert.equal(s.selected(), 0);
  s.window.dispatch("scroll");
  assert.equal(s.frames.size, 1);
  s.flush();
  assert.equal(s.frames.size, 0);
});

test("step progress is clamped and the visible shelf nearest the upper middle is active", () => {
  const s = scene();
  s.geometries[0].top = -900;
  s.geometries[1].top = 0;
  s.geometries[2].top = 1000;
  s.visible();
  s.flush();
  assert.equal(s.progress(0), 1);
  assert.equal(s.progress(1), 0.6);
  assert.equal(s.progress(2), 0);
  assert.equal(s.selected(), 1);
  s.geometries[1].top = -600;
  s.geometries[2].top = 0;
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.selected(), 2);
  assert.equal(s.steps[1].classes.has("is-shelf-active"), false);
  assert.equal(s.steps.filter((step) => step.classes.has("is-shelf-active")).length, 1);
  s.geometries.forEach((geometry) => { geometry.top = 1000; });
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.selected(), -1, "no active shelf outside the visible viewport");
});

test("resize uses fresh geometry and unchanged progress avoids repeated CSS writes", () => {
  const s = scene();
  s.visible();
  s.flush();
  const writes = s.steps.reduce((total, step) => total + step.writes, 0);
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.steps.reduce((total, step) => total + step.writes, 0), writes);
  s.window.innerHeight = 600;
  s.geometries[0].top = 0;
  s.window.dispatch("resize");
  s.flush();
  assert.equal(s.progress(0), 0.5);
  s.geometries[0].top = NaN;
  s.window.dispatch("resize");
  s.flush();
  assert.equal(s.progress(0), 0, "invalid temporary geometry never becomes invalid CSS");
});

test("the value counts integer cents and formats amounts in German without editing invalid fields", () => {
  const s = scene();
  s.geometries[0].top = -600;
  s.visible();
  s.geometries[1].top = 900;
  s.flush();
  assert.match(s.value.textContent, /^85,00\s€$/);
  s.geometries[1].top = 300;
  s.window.dispatch("scroll");
  s.flush();
  assert.match(s.value.textContent, /^119,00\s€$/);
  s.geometries[1].top = 0;
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.progress(1), 0.6);
  assert.match(s.value.textContent, /^153,00\s€$/, "the full value is visible before the shelf leaves the viewport");
  assert.equal(s.selected(), 1);
  assert.equal(s.invalidValue.textContent, "Eigene Sammlung");
});

test("offscreen and hidden scenes stop listeners and cancel pending work without jumping", () => {
  const s = scene();
  s.visible();
  s.flush();
  const previous = s.progress(0);
  const reads = s.reads;
  s.window.dispatch("scroll");
  s.visible(false);
  assert.equal(s.frames.size, 0);
  assert.equal(s.window.events.has("scroll"), false);
  assert.equal(s.window.events.has("resize"), false);
  assert.equal(s.progress(0), previous);
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.reads, reads);
  s.hidden();
  s.visible();
  assert.equal(s.frames.size, 0);
  s.hidden(false);
  assert.equal(s.frames.size, 1);
  s.flush();
  s.window.dispatch("scroll");
  s.hidden();
  assert.equal(s.frames.size, 0);
  assert.equal(s.window.events.has("scroll"), false);
  assert.equal(s.progress(0), previous);
});

test("reduced motion keeps complete static markup and preference changes restore it", () => {
  const s = scene({ reduced: true, legacyMedia: true });
  s.visible();
  assert.equal(s.ready, false);
  assert.equal(s.frames.size, 0);
  assert.equal(s.steps[0].properties.has("--shelf-progress"), false);
  assert.equal(s.value.textContent, "153,00 €");
  s.preference.matches = false;
  s.preference.dispatch("change");
  s.flush();
  assert.equal(s.ready, true);
  assert.notEqual(s.value.textContent, "153,00 €");
  s.window.dispatch("scroll");
  s.preference.matches = true;
  s.preference.dispatch("change");
  assert.equal(s.ready, false);
  assert.equal(s.frames.size, 0);
  assert.equal(s.selected(), -1);
  assert.equal(s.window.events.has("scroll"), false);
  assert.equal(s.steps[0].properties.has("--shelf-progress"), false);
  assert.equal(s.value.textContent, "153,00 €");
});

test("missing capabilities and failed observers retain the static layout", () => {
  for (const options of [{ root: false }, { empty: true }, { media: false }, { observer: false }, { raf: false }, { brokenObserver: true }, { brokenObserve: true }]) {
    const s = scene(options);
    s.visible();
    s.flush();
    assert.equal(s.ready, false);
    assert.equal(s.reads, 0);
    assert.equal(s.frames.size, 0);
    assert.equal(s.window.events.has("scroll"), false);
    assert.equal(s.value.textContent, "153,00 €");
  }
});

test("the browser source survives Worker minification with preserved function names", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-shelf-motion.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const s = scene({ script: bundled.LANDING_SHELF_SCRIPT });
  s.visible();
  s.flush();
  assert.equal(s.ready, true);
  assert.equal(s.selected(), 0);
  s.hidden();
  assert.equal(s.frames.size, 0);
});
