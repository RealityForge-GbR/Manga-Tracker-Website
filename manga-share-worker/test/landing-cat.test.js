import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { LANDING_CAT_SCRIPT } from "../src/landing-cat.js";

function scene({ observer = true, media = true, reduced = false, decode = true, brokenObserver = false, script = LANDING_CAT_SCRIPT } = {}) {
  class Element {
    constructor() {
      this.events = new Map();
      this.attributes = new Map();
      this.classes = new Set();
      this.hidden = true;
      this.classList = {
        add: (name) => this.classes.add(name),
        remove: (name) => this.classes.delete(name),
        toggle: (name, force) => force ? this.classes.add(name) : this.classes.delete(name),
      };
    }
    addEventListener(name, callback) { this.events.set(name, callback); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    getAttribute(name) { return this.attributes.get(name) ?? null; }
    dispatch(name) { this.events.get(name)?.(); }
  }
  const root = new Element();
  const sprite = new Element();
  sprite.setAttribute("data-src", "/landing/manga-cat-sprite.webp");
  sprite.complete = false;
  sprite.naturalWidth = 0;
  let resolveDecode;
  let rejectDecode;
  let decodeCalls = 0;
  if (decode) sprite.decode = () => {
    decodeCalls += 1;
    return new Promise((resolve, reject) => { resolveDecode = resolve; rejectDecode = reject; });
  };
  const toggle = new Element();
  root.querySelector = (selector) => ({ "[data-cat-sprite]": sprite, "[data-cat-toggle]": toggle })[selector];
  const document = new Element();
  document.hidden = false;
  document.querySelector = () => root;
  const preference = new Element();
  preference.matches = reduced;
  const observers = [];
  const window = {};
  if (media) window.matchMedia = () => preference;
  if (observer) window.IntersectionObserver = class {
    constructor(callback, options) {
      if (brokenObserver) throw new Error("observer unavailable");
      this.callback = callback;
      this.options = options;
      this.disconnected = false;
      observers.push(this);
    }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  vm.runInNewContext(script, { document, window });
  return {
    root, sprite, toggle, document, preference, observers,
    get decodeCalls() { return decodeCalls; },
    near(value = true) { observers.find((item) => item.options.rootMargin)?.callback([{ isIntersecting: value }]); },
    visible(value = true) { observers.find((item) => !item.options.rootMargin)?.callback([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    load() { sprite.complete = true; sprite.naturalWidth = 7680; sprite.dispatch("load"); },
    decoded() { resolveDecode?.(); },
    decodeRejected() { rejectDecode?.(new Error("decode rejected")); },
  };
}

const isPlaying = (s) => s.root.classes.has("is-cat-playing");
const flush = () => Promise.resolve();

test("cat artwork loads near the section but plays only after decoding in view", async () => {
  const s = scene();
  assert.equal(s.sprite.getAttribute("src"), null, "the footer image must not load at page start");
  assert.equal(s.toggle.hidden, true);
  s.near();
  assert.equal(s.sprite.getAttribute("src"), "/landing/manga-cat-sprite.webp");
  assert.ok(s.observers.find((item) => item.options.rootMargin).disconnected);
  s.load();
  assert.equal(s.decodeCalls, 1);
  assert.equal(isPlaying(s), false);
  s.decoded();
  await flush();
  assert.ok(s.root.classes.has("is-cat-ready"));
  assert.equal(isPlaying(s), false, "preloading outside the viewport must not start movement");
  s.visible();
  assert.equal(isPlaying(s), true);
  assert.equal(s.toggle.hidden, false);
  s.load();
  assert.equal(s.decodeCalls, 1, "a duplicate load event must not restart decoding");
});

test("offscreen and inactive tabs stop the sprite and resume only in the visible tab", async () => {
  const s = scene();
  s.visible();
  s.load();
  s.decoded();
  await flush();
  assert.equal(isPlaying(s), true);
  s.visible(false);
  assert.equal(isPlaying(s), false);
  s.hidden();
  s.visible();
  assert.equal(isPlaying(s), false);
  s.hidden(false);
  assert.equal(isPlaying(s), true);
});

test("a decode completing after the section is hidden cannot start the animation", async () => {
  const s = scene();
  s.visible();
  s.load();
  s.visible(false);
  s.hidden();
  s.decoded();
  await flush();
  assert.ok(s.root.classes.has("is-cat-ready"));
  assert.equal(isPlaying(s), false);
  s.hidden(false);
  assert.equal(isPlaying(s), false);
  s.visible();
  assert.equal(isPlaying(s), true);
});

test("manual pause survives tab and scroll changes and exposes its current action", async () => {
  const s = scene();
  s.visible();
  s.load();
  s.decoded();
  await flush();
  s.toggle.dispatch("click");
  assert.equal(isPlaying(s), false);
  assert.equal(s.toggle.getAttribute("aria-pressed"), "true");
  assert.equal(s.toggle.getAttribute("aria-label"), "Katzenanimation abspielen");
  s.visible(false);
  s.hidden();
  s.visible();
  s.hidden(false);
  assert.equal(isPlaying(s), false);
  s.toggle.dispatch("click");
  assert.equal(isPlaying(s), true);
  assert.equal(s.toggle.getAttribute("aria-pressed"), "false");
  assert.equal(s.toggle.getAttribute("aria-label"), "Katzenanimation pausieren");
});

test("reduced-motion preference keeps a static cat and responds to later preference changes", async () => {
  const s = scene({ reduced: true });
  s.visible();
  s.load();
  s.decoded();
  await flush();
  assert.ok(s.root.classes.has("is-cat-ready"));
  assert.equal(isPlaying(s), false);
  assert.equal(s.toggle.hidden, true);
  s.preference.matches = false;
  s.preference.dispatch("change");
  assert.equal(isPlaying(s), true);
  s.preference.matches = true;
  s.preference.dispatch("change");
  assert.equal(isPlaying(s), false);
  assert.equal(s.toggle.hidden, true);
});

test("missing browser capabilities retain a static image without an unusable pause control", async () => {
  for (const options of [{ observer: false }, { brokenObserver: true }, { media: false }]) {
    const s = scene(options);
    s.visible();
    assert.equal(s.sprite.getAttribute("src"), "/landing/manga-cat-sprite.webp");
    s.load();
    s.decoded();
    await flush();
    assert.ok(s.root.classes.has("is-cat-ready"));
    assert.equal(isPlaying(s), false);
    assert.equal(s.toggle.hidden, true);
  }
  const oldImage = scene({ decode: false });
  oldImage.visible();
  oldImage.load();
  assert.ok(oldImage.root.classes.has("is-cat-ready"));
  assert.equal(isPlaying(oldImage), true);
});

test("a failed sprite stays still even if an older decode subsequently resolves", async () => {
  const s = scene();
  s.visible();
  s.load();
  s.sprite.dispatch("error");
  s.decoded();
  await flush();
  assert.equal(isPlaying(s), false);
  assert.ok(!s.root.classes.has("is-cat-ready"));
  assert.ok(s.root.classes.has("is-cat-unavailable"));
  assert.equal(s.toggle.hidden, true);
  const fallback = scene();
  fallback.visible();
  fallback.load();
  fallback.decodeRejected();
  await flush();
  assert.ok(fallback.root.classes.has("is-cat-ready"), "an already decoded image can survive a browser decode rejection");
});

test("the cat controller survives the same bundling and name preservation used by the Worker", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-cat.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const s = scene({ script: bundled.LANDING_CAT_SCRIPT });
  s.visible();
  s.load();
  s.decoded();
  await flush();
  assert.equal(isPlaying(s), true);
  s.hidden();
  assert.equal(isPlaying(s), false);
});
