import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { LANDING_MOBILE_PARALLAX_SCRIPT } from "../src/landing-mobile-parallax.js";

const { build } = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({ mobile = true, reduced = false, media = true, observer = true, raf = true, brokenObserver = false, root = true, legacyMedia = false, script = LANDING_MOBILE_PARALLAX_SCRIPT } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback, options) { this.events.set(name, { callback, options }); }
    removeEventListener(name, callback) { if (this.events.get(name)?.callback === callback) this.events.delete(name); }
    dispatch(name) { this.events.get(name)?.callback(); }
  }
  const element = new Events();
  element.classes = new Set();
  element.properties = new Map();
  element.writes = 0;
  element.classList = { add: (name) => element.classes.add(name), remove: (name) => element.classes.delete(name) };
  element.style = { setProperty: (name, value) => { element.properties.set(name, value); element.writes += 1; } };
  const geometry = { top: 72, height: 800 };
  let reads = 0;
  const hero = { getBoundingClientRect: () => { reads += 1; return { ...geometry }; } };
  element.closest = (selector) => selector === ".hero" ? hero : null;
  const document = new Events();
  document.hidden = false;
  document.querySelector = () => root ? element : null;
  const viewport = new Events();
  viewport.matches = mobile;
  const preference = new Events();
  preference.matches = reduced;
  if (legacyMedia) for (const query of [viewport, preference]) {
    query.addListener = (callback) => query.events.set("change", { callback });
    query.addEventListener = undefined;
  }
  const frames = new Map();
  let nextFrame = 0;
  const window = new Events();
  if (media) window.matchMedia = (query) => query.includes("max-width") ? viewport : preference;
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
    observe() {}
    disconnect() { disconnected = true; }
  };
  vm.runInNewContext(script, { window, document });
  return {
    element, document, window, viewport, preference, frames, geometry,
    get reads() { return reads; },
    get disconnected() { return disconnected; },
    get progress() { return Number(element.properties.get("--mobile-progress")); },
    get active() { return element.classes.has("is-parallax-active"); },
    visible(value = true) { intersection?.([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    flush() { const callbacks = Array.from(frames.values()); frames.clear(); callbacks.forEach((callback) => callback()); },
  };
}

test("mobile parallax starts from zero and coalesces scroll events into one frame", () => {
  const s = scene();
  assert.equal(s.progress, 0);
  assert.equal(s.frames.size, 0, "a scene outside the viewport does no work");
  s.visible();
  assert.equal(s.active, true);
  assert.equal(s.window.events.get("scroll").options.passive, true);
  assert.equal(s.frames.size, 1);
  s.flush();
  assert.equal(s.progress, 0, "the page top keeps the centered composition untouched");
  assert.equal(s.frames.size, 0, "there must be no continuous animation loop");
  s.geometry.top = -200;
  s.window.dispatch("scroll");
  s.window.dispatch("scroll");
  s.window.dispatch("scroll");
  assert.equal(s.frames.size, 1);
  assert.equal(s.reads, 1);
  s.flush();
  assert.equal(s.progress, 0.25);
  assert.equal(s.reads, 2);
  assert.equal(s.frames.size, 0);
});

test("progress uses current untransformed hero geometry and stays clamped", () => {
  const s = scene();
  s.visible();
  s.geometry.top = -400;
  s.flush();
  assert.equal(s.progress, 0.5);
  s.geometry.height = 1600;
  s.window.dispatch("resize");
  s.flush();
  assert.equal(s.progress, 0.25, "layout changes must not use stale offsets");
  s.geometry.top = -3200;
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.progress, 1);
  s.geometry.top = 20;
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.progress, 0);
  s.geometry.height = 0;
  s.window.dispatch("resize");
  s.flush();
  assert.equal(s.progress, 0, "a temporarily collapsed section produces no invalid CSS value");
});

test("offscreen and inactive tabs cancel pending work and remove scroll listeners", () => {
  const s = scene();
  s.visible();
  s.geometry.top = -200;
  s.flush();
  assert.equal(s.progress, 0.25);
  s.window.dispatch("scroll");
  s.visible(false);
  assert.equal(s.active, false);
  assert.equal(s.progress, 0);
  assert.equal(s.frames.size, 0);
  assert.equal(s.window.events.has("scroll"), false);
  assert.equal(s.window.events.has("resize"), false);
  s.hidden();
  s.visible();
  assert.equal(s.active, false);
  s.hidden(false);
  assert.equal(s.active, true);
  s.flush();
  assert.equal(s.progress, 0.25);
  s.window.dispatch("scroll");
  s.hidden();
  assert.equal(s.frames.size, 0);
  assert.equal(s.progress, 0);
  assert.equal(s.active, false);
});

test("desktop stays still and changing the mobile breakpoint starts and stops correctly", () => {
  const s = scene({ mobile: false });
  s.visible();
  assert.equal(s.active, false);
  assert.equal(s.frames.size, 0);
  assert.equal(s.window.events.has("scroll"), false);
  s.viewport.matches = true;
  s.viewport.dispatch("change");
  assert.equal(s.active, true);
  s.geometry.top = -160;
  s.flush();
  assert.equal(s.progress, 0.2);
  s.window.dispatch("scroll");
  s.viewport.matches = false;
  s.viewport.dispatch("change");
  assert.equal(s.active, false);
  assert.equal(s.progress, 0);
  assert.equal(s.frames.size, 0);
  s.viewport.matches = true;
  s.viewport.dispatch("change");
  s.flush();
  assert.equal(s.progress, 0.2);
});

test("reduced motion remains static and later preference changes are respected", () => {
  const s = scene({ reduced: true });
  s.visible();
  assert.equal(s.active, false);
  assert.equal(s.frames.size, 0);
  s.preference.matches = false;
  s.preference.dispatch("change");
  assert.equal(s.active, true);
  s.geometry.top = -120;
  s.flush();
  assert.equal(s.progress, 0.15);
  s.preference.matches = true;
  s.preference.dispatch("change");
  assert.equal(s.active, false);
  assert.equal(s.progress, 0);
  assert.equal(s.window.events.has("scroll"), false);
});

test("missing capabilities and missing markup retain the static composition", () => {
  for (const options of [{ media: false }, { observer: false }, { raf: false }, { brokenObserver: true }, { root: false }]) {
    const s = scene(options);
    s.visible();
    assert.equal(s.active, false);
    assert.equal(s.frames.size, 0);
    assert.equal(s.window.events.has("scroll"), false);
  }
});

test("legacy media listeners work and an unchanged position avoids needless style writes", () => {
  const s = scene({ legacyMedia: true });
  s.visible();
  s.flush();
  const writes = s.element.writes;
  s.window.dispatch("scroll");
  s.flush();
  assert.equal(s.element.writes, writes);
  s.preference.matches = true;
  s.preference.dispatch("change");
  assert.equal(s.active, false);
});

test("the controller survives Worker bundling with minification and preserved names", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-mobile-parallax.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const s = scene({ script: bundled.LANDING_MOBILE_PARALLAX_SCRIPT });
  s.visible();
  s.geometry.top = -240;
  s.flush();
  assert.equal(s.progress, 0.3);
  s.hidden();
  assert.equal(s.active, false);
  assert.equal(s.progress, 0);
});
