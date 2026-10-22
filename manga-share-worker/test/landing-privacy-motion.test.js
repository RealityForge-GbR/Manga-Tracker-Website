import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { LANDING_PRIVACY_SCRIPT } from "../src/landing-privacy-motion.js";

const { build } = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({ reduced = false, hidden = false, root = true, media = true, observer = true, legacyMedia = false, brokenMedia = false, brokenObserver = false, brokenObserve = false, mediaEvents = true, script = LANDING_PRIVACY_SCRIPT } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback) { this.events.set(name, callback); }
    dispatch(name, event) { this.events.get(name)?.(event); }
  }
  const element = Object.assign(new Events(), { classes: new Set(), changes: [] });
  element.classList = {
    add(...names) { for (const name of names) { element.classes.add(name); element.changes.push(["add", name]); } },
    remove(...names) { for (const name of names) { element.classes.delete(name); element.changes.push(["remove", name]); } },
  };
  const document = new Events();
  document.hidden = hidden;
  document.querySelector = (selector) => selector === "[data-privacy-lock]" && root ? element : null;
  const preference = new Events();
  preference.matches = reduced;
  if (legacyMedia) {
    preference.addListener = (callback) => preference.events.set("change", callback);
    preference.addEventListener = undefined;
  }
  if (!mediaEvents) { preference.addListener = undefined; preference.addEventListener = undefined; }
  const window = new Events();
  window.innerHeight = 1000;
  window.removeEventListener = (name) => window.events.delete(name);
  if (media) window.matchMedia = () => {
    if (brokenMedia) throw new Error("unavailable");
    return preference;
  };
  let intersection;
  let midpoint;
  let gateOptions;
  let disconnected = false;
  let options;
  if (observer) window.IntersectionObserver = class {
    constructor(callback, settings) {
      if (brokenObserver) throw new Error("unavailable");
      if (settings.rootMargin?.includes("-")) { midpoint = callback; gateOptions = settings; }
      else { intersection = callback; options = settings; }
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
    get gateOptions() { return gateOptions; },
    approach() { intersection?.([{target:element,isIntersecting:true,intersectionRatio:1}]); },
    midpoint(on=true) { midpoint?.([{target:element,isIntersecting:on,intersectionRatio:on?1:0}]); },
    resize(height) { window.innerHeight=height; window.dispatch("resize"); },
    get disconnected() { return disconnected; },
    get ready() { return element.classes.has("is-lock-ready"); },
    get playing() { return element.classes.has("is-lock-playing"); },
    visible(ratio = 1, isIntersecting = ratio > 0) { intersection?.([{ target: element, isIntersecting, intersectionRatio: ratio }]); if(isIntersecting)midpoint?.([{target:element,isIntersecting:true,intersectionRatio:1}]); },
    finish(animationName = "privacy-lock-shut") { element.dispatch("animationend", { animationName }); },
    unrelatedEntry() { intersection?.([{ target: {}, isIntersecting: false, intersectionRatio: 0 }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    reduce(value = true) { preference.matches = value; preference.dispatch("change"); },
  };
}

test("lock playback waits for the viewport midpoint without a JavaScript animation loop", () => {
  const s = scene();
  assert.equal(s.ready, true);
  assert.equal(s.playing, false);
  assert.equal(s.options.rootMargin, "0px");
  assert.equal(s.gateOptions.rootMargin, "0px 0px -500px 0px");
  s.approach();assert.equal(s.playing,false);
  s.midpoint(false);assert.equal(s.playing,false);
  assert.equal(s.options.threshold, 0);
  s.visible(0, false);
  assert.equal(s.playing, false);
  s.visible(0.01);
  assert.equal(s.playing, true);
  s.unrelatedEntry();
  assert.equal(s.playing, true);
  s.visible(1, false);
  assert.equal(s.playing, false);
});

test("the lock pauses mid-close, then stays closed after completion and later scrolling", () => {
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
  assert.equal(s.element.changes.some(([, name]) => name === "is-lock-ready"), false, "the animation-owning class remains untouched during pauses");
  const writes = s.element.changes.length;
  s.visible();
  s.hidden(false);
  assert.equal(s.element.changes.length, writes, "unchanged playback avoids repeated class writes");
  s.finish("privacy-lock-snap");
  assert.equal(s.playing, true, "decorative animation events do not complete the lock");
  s.finish();
  assert.equal(s.ready, false, "completion retains the static closed rose illustration");
  assert.equal(s.playing, false);
  assert.equal(s.disconnected, true);
  s.visible(0);
  s.visible();
  s.hidden();
  s.hidden(false);
  s.reduce();
  s.reduce(false);
  assert.equal(s.ready, false, "scrolling, tab changes and preference changes cannot reopen a completed lock");
  assert.equal(s.playing, false);
});

test("an initially hidden page stays paused even when the scene is in view", () => {
  const s = scene({ hidden: true });
  s.visible();
  assert.equal(s.ready, true);
  assert.equal(s.playing, false);
  s.hidden(false);
  assert.equal(s.playing, true);
});

test("reduced motion closes the lock permanently, including during an unfinished close", () => {
  for (const legacyMedia of [false, true]) {
    for (const reduced of [false, true]) {
      const s = scene({ reduced, legacyMedia });
      s.visible();
      assert.equal(s.playing, !reduced);
      s.reduce();
      assert.equal(s.ready, false);
      assert.equal(s.playing, false);
      s.reduce(false);
      s.visible(0);
      s.visible();
      assert.equal(s.ready, false, "a lock already shown closed cannot reopen");
      assert.equal(s.playing, false);
    }
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
    entryPoints: [fileURLToPath(new URL("../src/landing-privacy-motion.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const s = scene({ script: bundled.LANDING_PRIVACY_SCRIPT });
  s.visible();
  assert.equal(s.playing, true);
  s.hidden();
  assert.equal(s.playing, false);
  assert.equal(s.ready, true);
});

test("lock midpoint adapts to viewport resizing before it starts", () => {
  const s=scene();s.approach();s.resize(700);
  assert.equal(s.gateOptions.rootMargin,"0px 0px -350px 0px");
  assert.equal(s.playing,false);s.midpoint();assert.equal(s.playing,true);
  s.finish();s.resize(1200);s.visible();assert.equal(s.ready,false);assert.equal(s.playing,false);
});
