import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { LANDING_HERO_FLOAT_SCRIPT } from "../src/landing-hero-float.js";

const { build } = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({ desktop = true, reduced = false, media = true, observer = true, raf = true, brokenObserver = false, brokenObserve = false, root = true, legacyMedia = false, script = LANDING_HERO_FLOAT_SCRIPT } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback, options) { this.events.set(name, { callback, options }); }
    removeEventListener(name, callback) { if (this.events.get(name)?.callback === callback) this.events.delete(name); }
    dispatch(name, event) { this.events.get(name)?.callback(event); }
  }
  const element = new Events();
  element.classes = new Set();
  element.properties = new Map();
  element.writes = 0;
  element.classList = { add: (name) => element.classes.add(name), remove: (name) => element.classes.delete(name) };
  element.style = { setProperty(name, value) { element.properties.set(name, value); element.writes += 1; } };
  const geometry = { left: 100, top: 50, width: 400, height: 600 };
  let reads = 0;
  element.getBoundingClientRect = () => { reads += 1; return { ...geometry }; };
  const document = new Events();
  document.hidden = false;
  document.querySelector = (selector) => selector === "[data-floating-hero]" && root ? element : null;
  const viewport = new Events();
  viewport.matches = desktop;
  const preference = new Events();
  preference.matches = reduced;
  if (legacyMedia) for (const query of [viewport, preference]) {
    query.addListener = (callback) => query.events.set("change", { callback });
    query.addEventListener = undefined;
  }
  const window = new Events();
  if (media) window.matchMedia = (query) => query.includes("min-width") ? viewport : preference;
  const frames = new Map();
  let nextFrame = 0;
  if (raf) {
    window.requestAnimationFrame = (callback) => { const id = nextFrame++; frames.set(id, callback); return id; };
    window.cancelAnimationFrame = (id) => frames.delete(id);
  }
  let intersection;
  let disconnected = false;
  if (observer) window.IntersectionObserver = class {
    constructor(callback) {
      if (brokenObserver) throw new Error("unavailable");
      intersection = callback;
    }
    observe(target) {
      if (brokenObserve) throw new Error("cannot observe");
      assert.equal(target, element);
    }
    disconnect() { disconnected = true; }
  };
  vm.runInNewContext(script, { document, window });
  return {
    element, document, window, viewport, preference, frames, geometry,
    get reads() { return reads; },
    get disconnected() { return disconnected; },
    get active() { return element.classes.has("is-hero-floating"); },
    get x() { return Number(element.properties.get("--hero-x")); },
    get y() { return Number(element.properties.get("--hero-y")); },
    visible(value = true) { intersection?.([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    move(clientX, clientY) { element.dispatch("pointermove", { clientX, clientY }); },
    flush() { const callbacks = Array.from(frames.values()); frames.clear(); callbacks.forEach((callback) => callback()); },
  };
}

test("desktop float starts only in view and CSS runs without a JavaScript frame loop", () => {
  const s = scene();
  assert.equal(s.active, false);
  assert.equal(s.x, 0);
  assert.equal(s.y, 0);
  assert.equal(s.element.events.size, 0);
  s.visible();
  assert.equal(s.active, true);
  assert.equal(s.frames.size, 0);
  assert.equal(s.reads, 0);
  assert.equal(s.element.events.get("pointermove").options.passive, true);
  assert.equal(s.element.events.get("pointerleave").options.passive, true);
  assert.equal(s.window.events.size, 0, "pointer listeners must stay on the scene");
});

test("an event burst uses the latest pointer and one frame with one geometry read", () => {
  const s = scene();
  s.visible();
  s.move(100, 50);
  s.move(300, 350);
  s.move(400, 200);
  assert.equal(s.frames.size, 1);
  assert.equal(s.reads, 0);
  s.flush();
  assert.equal(s.x, 0.5);
  assert.equal(s.y, -0.5);
  assert.equal(s.reads, 1);
  assert.equal(s.frames.size, 0);
  const writes = s.element.writes;
  s.move(400, 200);
  s.flush();
  assert.equal(s.element.writes, writes, "unchanged coordinates avoid style writes");
});

test("pointer coordinates use current geometry and clamp safely", () => {
  const s = scene();
  s.visible();
  s.move(-100, 1000);
  s.flush();
  assert.equal(s.x, -1);
  assert.equal(s.y, 1);
  s.geometry.width = 800;
  s.geometry.height = 1200;
  s.move(500, 650);
  s.flush();
  assert.equal(s.x, 0);
  assert.equal(s.y, 0);
  s.geometry.width = 0;
  s.geometry.height = 0;
  s.move(1000, 1000);
  s.flush();
  assert.equal(s.x, 0);
  assert.equal(s.y, 0);
  s.geometry.width = 400;
  s.geometry.height = 600;
  s.move(NaN, Infinity);
  s.flush();
  assert.equal(s.x, 0);
  assert.equal(s.y, 0);
});

test("pointer leave cancels the frame and resets parallax while CSS keeps floating", () => {
  const s = scene();
  s.visible();
  s.move(500, 650);
  s.flush();
  assert.equal(s.x, 1);
  assert.equal(s.y, 1);
  s.move(100, 50);
  assert.equal(s.frames.size, 1);
  s.element.dispatch("pointerleave");
  assert.equal(s.frames.size, 0);
  assert.equal(s.x, 0);
  assert.equal(s.y, 0);
  assert.equal(s.active, true);
  s.move(100, 50);
  s.flush();
  assert.equal(s.x, -1);
  assert.equal(s.y, -1);
});

test("offscreen and hidden scenes remove pointer listeners and cancel pending work", () => {
  const s = scene();
  s.visible();
  s.move(500, 650);
  s.flush();
  s.move(100, 50);
  s.visible(false);
  assert.equal(s.active, false);
  assert.equal(s.element.events.size, 0);
  assert.equal(s.frames.size, 0);
  assert.equal(s.x, 0);
  assert.equal(s.y, 0);
  s.hidden();
  s.visible();
  assert.equal(s.active, false);
  s.hidden(false);
  assert.equal(s.active, true);
  s.move(500, 650);
  s.hidden();
  assert.equal(s.active, false);
  assert.equal(s.element.events.size, 0);
  assert.equal(s.frames.size, 0);
  assert.equal(s.x, 0);
});

test("mobile and reduced motion stay static and live preference changes are honored", () => {
  for (const options of [{ desktop: false }, { reduced: true }, { desktop: false, reduced: true, legacyMedia: true }]) {
    const s = scene(options);
    s.visible();
    assert.equal(s.active, false);
    assert.equal(s.element.events.size, 0);
    assert.equal(s.frames.size, 0);
    s.viewport.matches = true;
    s.preference.matches = false;
    s.viewport.dispatch("change");
    assert.equal(s.active, true);
    s.move(500, 650);
    s.flush();
    assert.equal(s.x, 1);
    s.move(100, 50);
    s.preference.matches = true;
    s.preference.dispatch("change");
    assert.equal(s.active, false);
    assert.equal(s.x, 0);
    assert.equal(s.frames.size, 0);
    assert.equal(s.element.events.size, 0);
    s.preference.matches = false;
    s.preference.dispatch("change");
    assert.equal(s.active, true);
    s.viewport.matches = false;
    s.viewport.dispatch("change");
    assert.equal(s.active, false);
    assert.equal(s.element.events.size, 0);
  }
});

test("missing capabilities, failed observers, and absent markup keep the static scene", () => {
  for (const options of [{ root: false }, { media: false }, { observer: false }, { raf: false }, { brokenObserver: true }, { brokenObserve: true }]) {
    const s = scene(options);
    s.visible();
    s.move(500, 650);
    s.flush();
    assert.equal(s.active, false);
    assert.equal(s.frames.size, 0);
    assert.equal(s.element.events.size, 0);
    assert.equal(s.reads, 0);
    assert.equal(s.document.events.size, 0);
  }
});

test("the literal browser script survives minification with preserved function names", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-hero-float.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const s = scene({ script: bundled.LANDING_HERO_FLOAT_SCRIPT });
  s.visible();
  s.move(400, 200);
  s.flush();
  assert.equal(s.x, 0.5);
  assert.equal(s.y, -0.5);
  s.hidden();
  assert.equal(s.active, false);
  assert.equal(s.x, 0);
  assert.equal(s.element.events.size, 0);
});
