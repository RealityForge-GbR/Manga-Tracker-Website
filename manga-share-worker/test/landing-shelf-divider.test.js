import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { LANDING_SHELF_DIVIDER_SCRIPT } from "../src/landing-shelf-divider-motion.js";

function scene({ reduced = false, observer = true, media = true, root = true, broken = false, legacy = false } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback) { this.events.set(name, callback); }
    dispatch(name) { this.events.get(name)?.(); }
  }
  const classes = new Set();
  const element = { classList: { add: (value) => classes.add(value), remove: (value) => classes.delete(value) } };
  const document = new Events();
  document.hidden = false;
  document.querySelector = () => root ? element : null;
  const preference = new Events();
  preference.matches = reduced;
  if (legacy) {
    preference.addListener = (callback) => preference.events.set("change", callback);
    preference.addEventListener = undefined;
  }
  const window = {};
  if (media) window.matchMedia = () => preference;
  let callback;
  let disconnected = false;
  if (observer) window.IntersectionObserver = class {
    constructor(listener) { callback = listener; }
    observe(target) { assert.equal(target, element); if (broken) throw new Error("unavailable"); }
    disconnect() { disconnected = true; }
  };
  vm.runInNewContext(LANDING_SHELF_DIVIDER_SCRIPT, { document, window });
  return {
    get active() { return classes.has("is-shelf-divider-moving"); },
    get disconnected() { return disconnected; },
    visible(value = true) { callback?.([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    reduced(value = true) { preference.matches = value; preference.dispatch("change"); },
  };
}

test("shelf spines remain still until visible and pause when leaving the viewport", () => {
  const s = scene();
  assert.equal(s.active, false);
  s.visible();
  assert.equal(s.active, true);
  s.visible(false);
  assert.equal(s.active, false);
});

test("hidden documents and reduced-motion preference independently pause the shelf", () => {
  const s = scene();
  s.visible();
  s.hidden();
  assert.equal(s.active, false);
  s.reduced();
  s.hidden(false);
  assert.equal(s.active, false);
  s.reduced(false);
  assert.equal(s.active, true);
});

test("initial reduced-motion preference is respected, including legacy media change events", () => {
  const s = scene({ reduced: true, legacy: true });
  s.visible();
  assert.equal(s.active, false);
  s.reduced(false);
  assert.equal(s.active, true);
});

test("missing browser capabilities or root leave a safe static shelf", () => {
  for (const options of [{ observer: false }, { media: false }, { root: false }]) {
    const s = scene(options);
    s.visible();
    assert.equal(s.active, false);
  }
});

test("a failed observer disconnects without starting a detached animation", () => {
  const s = scene({ broken: true });
  assert.equal(s.disconnected, true);
  s.visible();
  assert.equal(s.active, false);
});
