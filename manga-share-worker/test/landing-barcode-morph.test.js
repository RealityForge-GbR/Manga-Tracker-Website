import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { BARCODE_MORPH_ISBN, BARCODE_MORPH_MODULES, BARCODE_MORPH_VOLUMES, LANDING_BARCODE_MORPH_MARKUP } from "../src/landing-barcode-morph.js";
import { LANDING_BARCODE_MORPH_SCRIPT } from "../src/landing-barcode-morph-motion.js";

const { transform } = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({ root = true, media = true, reduced = false, observer = true, brokenObserver = false, brokenObserve = false, legacy = false, script = LANDING_BARCODE_MORPH_SCRIPT } = {}) {
  class Events {
    constructor() { this.events = new Map(); }
    addEventListener(name, callback) { this.events.set(name, callback); }
    dispatch(name) { this.events.get(name)?.(); }
  }
  const classes = new Set();
  const element = { classList: { toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); } } };
  const preference = new Events();
  preference.matches = reduced;
  if (legacy) { preference.addListener = (callback) => preference.events.set("change", callback); preference.addEventListener = undefined; }
  const document = new Events();
  document.hidden = false;
  document.querySelector = (selector) => selector === "[data-barcode-morph]" && root ? element : null;
  const window = {};
  if (media) window.matchMedia = () => preference;
  let notify;
  let disconnected = false;
  if (observer) window.IntersectionObserver = class {
    constructor(callback) { if (brokenObserver) throw new Error("observer unavailable"); notify = callback; }
    observe(target) { assert.equal(target, element); if (brokenObserve) throw new Error("observe unavailable"); }
    disconnect() { disconnected = true; }
  };
  vm.runInNewContext(script, { document, window });
  return {
    document, preference, classes,
    get ready() { return classes.has("is-barcode-morph-ready"); },
    get moving() { return classes.has("is-barcode-morph-moving"); },
    get disconnected() { return disconnected; },
    visible(value = true) { notify?.([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    reduced(value = true) { preference.matches = value; preference.dispatch("change"); },
  };
}

test("the ISBN barcode has a valid check digit and the GS1 EAN-13 parity pattern", () => {
  const digits = Array.from(BARCODE_MORPH_ISBN, Number);
  const weighted = digits.slice(0, 12).reduce((sum, digit, index) => sum + digit * (index % 2 ? 3 : 1), 0);
  assert.equal((10 - weighted % 10) % 10, digits[12]);
  // Independently checked against the GS1 EAN-13 ABBABA parity for leading 9.
  assert.equal(BARCODE_MORPH_MODULES, "10101110110001001010000101100010111001001100101010100010010001001100110100111010001001001110101");
  assert.equal(BARCODE_MORPH_MODULES.length, 95);
});

test("every actual barcode stripe survives into one of six non-overlapping shelf books", () => {
  const reconstructed = Array(95).fill("0");
  assert.equal(BARCODE_MORPH_VOLUMES.length, 6);
  for (const [index, volume] of BARCODE_MORPH_VOLUMES.entries()) {
    assert.ok(volume.bars.length > 1);
    for (const bar of volume.bars) for (let cursor = bar.module; cursor < bar.module + bar.modules; cursor += 1) {
      assert.equal(reconstructed[cursor], "0", "a stripe module must not be duplicated between morph groups");
      reconstructed[cursor] = "1";
    }
    assert.equal(64 + volume.drop + volume.height, 468, "book bottoms meet the actual shelf surface");
    assert.ok(Math.abs(volume.startX + volume.shift - volume.targetX) < 0.00001);
    if (index) assert.ok(volume.targetX - BARCODE_MORPH_VOLUMES[index - 1].targetX >= 37, "rendered book pages must not overlap the adjacent spine");
  }
  assert.equal(reconstructed.join(""), BARCODE_MORPH_MODULES, "morph uses the scanned bars rather than swapping in unrelated books");
  assert.equal((LANDING_BARCODE_MORPH_MARKUP.match(/class="barcode-morph-binding"/g) || []).length, 6);
  assert.match(LANDING_BARCODE_MORPH_MARKUP, /Band für Band ins Regal/);
  assert.doesNotMatch(LANDING_BARCODE_MORPH_MARKUP, /<img|<video|<canvas/);
});

test("animation pauses offscreen and in a hidden tab without any frame loop", () => {
  const s = scene();
  assert.equal(s.ready, true);
  assert.equal(s.moving, false);
  s.visible();
  assert.equal(s.moving, true);
  s.hidden();
  assert.equal(s.ready, true, "visibility pauses the current CSS phase instead of resetting it");
  assert.equal(s.moving, false);
  s.hidden(false);
  assert.equal(s.moving, true);
  s.visible(false);
  assert.equal(s.moving, false);
  s.hidden(); s.hidden(false);
  assert.equal(s.moving, false, "returning to a hidden scene must not restart it");
  assert.doesNotMatch(LANDING_BARCODE_MORPH_SCRIPT, /requestAnimationFrame|setInterval|setTimeout/);
});

test("reduced motion shows the static completed shelf and can be changed at runtime", () => {
  for (const legacy of [false, true]) {
    const s = scene({ reduced: true, legacy });
    s.visible();
    assert.equal(s.ready, false);
    assert.equal(s.moving, false);
    s.reduced(false);
    assert.equal(s.ready, true);
    assert.equal(s.moving, true);
    s.reduced();
    assert.equal(s.ready, false);
    assert.equal(s.moving, false);
  }
});

test("missing or failed browser capabilities keep the completed shelf static", () => {
  for (const options of [{ root: false }, { media: false }, { observer: false }, { brokenObserver: true }, { brokenObserve: true }]) {
    const s = scene(options);
    s.visible();
    assert.equal(s.ready, false);
    assert.equal(s.moving, false);
    if (options.brokenObserve) assert.equal(s.disconnected, true);
  }
});

test("the production-minified controller preserves visibility and motion preferences", async () => {
  const { code } = await transform(LANDING_BARCODE_MORPH_SCRIPT, { minify: true, target: "es2022" });
  const s = scene({ script: code });
  s.visible();
  assert.equal(s.moving, true);
  s.reduced();
  assert.equal(s.ready, false);
  assert.equal(s.moving, false);
});
