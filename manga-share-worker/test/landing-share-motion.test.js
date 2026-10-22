import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { LANDING_SHARE_SCRIPT } from "../src/landing-share-motion.js";

const { build } = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({ reduced = false, hidden = false, root = true, media = true, observer = true, legacyMedia = false, brokenMedia = false, brokenObserver = false, brokenObserve = false, mediaEvents = true, script = LANDING_SHARE_SCRIPT } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback) { this.events.set(name, callback); }
    dispatch(name) { this.events.get(name)?.(); }
  }
  const element = { classes: new Set(), changes: [] };
  element.classList = {
    add(...names) { for (const name of names) { element.classes.add(name); element.changes.push(["add", name]); } },
    remove(...names) { for (const name of names) { element.classes.delete(name); element.changes.push(["remove", name]); } },
  };
  const document = new Events();
  document.hidden = hidden;
  document.querySelector = (selector) => selector === "[data-share-demo]" && root ? element : null;
  const preference = new Events();
  preference.matches = reduced;
  if (legacyMedia) {
    preference.addListener = (callback) => preference.events.set("change", callback);
    preference.addEventListener = undefined;
  }
  if (!mediaEvents) { preference.addListener = undefined; preference.addEventListener = undefined; }
  const window = {};
  if (media) window.matchMedia = () => {
    if (brokenMedia) throw new Error("unavailable");
    return preference;
  };
  let intersection;
  let disconnected = false;
  let options;
  if (observer) window.IntersectionObserver = class {
    constructor(callback, settings) {
      if (brokenObserver) throw new Error("unavailable");
      intersection = callback;
      options = settings;
    }
    observe(target) {
      if (brokenObserve) throw new Error("cannot observe");
      assert.equal(target, element);
    }
    disconnect() { disconnected = true; }
  };
  const noLoop = () => { throw new Error("CSS playback must not schedule JavaScript frames or timers"); };
  window.requestAnimationFrame = noLoop;
  window.setInterval = noLoop;
  window.setTimeout = noLoop;
  vm.runInNewContext(script, { document, window, requestAnimationFrame: noLoop, setInterval: noLoop, setTimeout: noLoop });
  return {
    element, document, preference,
    get options() { return options; },
    get disconnected() { return disconnected; },
    get ready() { return element.classes.has("is-share-ready"); },
    get playing() { return element.classes.has("is-share-playing"); },
    visible(ratio = 1, isIntersecting = ratio > 0) { intersection?.([{ target: element, isIntersecting, intersectionRatio: ratio }]); },
    unrelatedEntry() { intersection?.([{ target: {}, isIntersecting: false, intersectionRatio: 0 }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    reduce(value = true) { preference.matches = value; preference.dispatch("change"); },
  };
}

test("share playback waits for at least 20% visibility without a JavaScript animation loop", () => {
  const s = scene();
  assert.equal(s.ready, true);
  assert.equal(s.playing, false);
  assert.deepEqual(Array.from(s.options.threshold), [0, 0.2]);
  s.visible(0.19);
  assert.equal(s.playing, false);
  s.visible(0.2);
  assert.equal(s.playing, true);
  s.unrelatedEntry();
  assert.equal(s.playing, true);
  s.visible(1, false);
  assert.equal(s.playing, false);
});

test("offscreen and hidden scenes pause without recreating the CSS timeline", () => {
  const s = scene();
  s.visible();
  s.element.changes.length = 0;
  s.visible(0);
  assert.equal(s.playing, false);
  assert.equal(s.ready, true);
  s.visible();
  s.hidden();
  assert.equal(s.playing, false);
  assert.equal(s.ready, true);
  s.hidden(false);
  assert.equal(s.playing, true);
  assert.equal(s.element.changes.some(([, name]) => name === "is-share-ready"), false, "the animation-owning class remains untouched during pauses");
  const writes = s.element.changes.length;
  s.visible();
  s.hidden(false);
  assert.equal(s.element.changes.length, writes, "unchanged playback avoids repeated class writes");
});

test("an initially hidden page stays paused even when the scene is in view", () => {
  const s = scene({ hidden: true });
  s.visible();
  assert.equal(s.ready, true);
  assert.equal(s.playing, false);
  s.hidden(false);
  assert.equal(s.playing, true);
});

test("reduced motion shows the static illustration and preference changes are honored", () => {
  for (const legacyMedia of [false, true]) {
    const s = scene({ reduced: true, legacyMedia });
    s.visible();
    assert.equal(s.ready, false);
    assert.equal(s.playing, false);
    s.reduce(false);
    assert.equal(s.ready, true);
    assert.equal(s.playing, true);
    s.reduce();
    assert.equal(s.ready, false);
    assert.equal(s.playing, false);
    s.visible(0);
    s.reduce(false);
    assert.equal(s.ready, true);
    assert.equal(s.playing, false);
  }
});

test("missing or failed browser capabilities leave a useful static scene", () => {
  for (const options of [{ root: false }, { media: false }, { mediaEvents: false }, { observer: false }, { brokenMedia: true }, { brokenObserver: true }, { brokenObserve: true }]) {
    const s = scene(options);
    s.visible();
    s.hidden();
    assert.equal(s.ready, false);
    assert.equal(s.playing, false);
    assert.equal(s.document.events.size, 0);
  }
  assert.equal(scene({ brokenObserve: true }).disconnected, true);
});

test("the literal browser script survives Worker minification with function names preserved", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-share-motion.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const s = scene({ script: bundled.LANDING_SHARE_SCRIPT });
  s.visible();
  assert.equal(s.playing, true);
  s.hidden();
  assert.equal(s.playing, false);
  assert.equal(s.ready, true);
});
