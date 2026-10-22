import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { LANDING_BUDGET_SCRIPT } from "../src/landing-budget.js";

function cycle({ reduced = false, observer = true, media = true, brokenObserver = false, brokenObserve = false, script = LANDING_BUDGET_SCRIPT } = {}) {
  class Element {
    constructor() {
      this.textContent = "";
      this.events = new Map();
      this.attributes = new Map();
      this.classes = new Set();
      this.classList = { add: (name) => this.classes.add(name), remove: (name) => this.classes.delete(name) };
      this.style = { setProperty: (name, value) => this.attributes.set(name, value) };
    }
    setAttribute(name, value) { this.attributes.set(name, value); }
    removeAttribute(name) { this.attributes.delete(name); }
    addEventListener(name, callback) { this.events.set(name, callback); }
    dispatch(name) { this.events.get(name)?.(); }
  }
  const root = new Element();
  const fields = Object.fromEntries(["budget", "value", "count"].map((name) => [name, new Element()]));
  root.querySelector = (selector) => fields[/^\[data-cycle-(.+)\]$/.exec(selector)?.[1]];
  const document = new Element();
  document.hidden = false;
  document.querySelector = () => root;
  const preference = new Element();
  preference.matches = reduced;
  let intersect;
  let observerOptions;
  let disconnected = false;
  let clock = 0;
  let nextId = 0;
  const tasks = new Map();
  const callbacks = [];
  const window = {};
  if (media) window.matchMedia = () => preference;
  if (observer) window.IntersectionObserver = class {
    constructor(callback, options) {
      if (brokenObserver) throw new Error("Observer unavailable");
      intersect = callback;
      observerOptions = options;
    }
    observe() { if (brokenObserve) throw new Error("Observation unavailable"); }
    disconnect() { disconnected = true; }
  };
  vm.runInNewContext(script, {
    document, window, Intl, Date, performance: { now: () => clock },
    setTimeout(callback, delay) {
      assert.equal(tasks.size, 0, "only one milestone timer may exist");
      assert.ok(delay >= 0 && Number.isFinite(delay));
      const id = ++nextId;
      tasks.set(id, { callback, at: clock + delay });
      callbacks.push(callback);
      return id;
    },
    clearTimeout(id) { tasks.delete(id); },
  });
  function advance(milliseconds) {
    const end = clock + milliseconds;
    let guard = 0;
    while (tasks.size) {
      const [id, task] = [...tasks.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (task.at > end) break;
      assert.ok(++guard < 1000, "timer loop must make progress");
      clock = task.at;
      tasks.delete(id);
      task.callback();
    }
    clock = end;
  }
  const amount = (name) => Number(fields[name].textContent.replace(/[^0-9-]/g, ""));
  return {
    root, fields, document, preference, tasks, callbacks, advance, amount,
    stage: () => root.attributes.get("data-cycle-stage"),
    visible(value = true, ratio = value ? 1 : 0) { intersect?.([{ target: root, isIntersecting: value, intersectionRatio: ratio }]); },
    intersections(entries) { intersect?.(entries); },
    get observerOptions() { return observerOptions; },
    get disconnected() { return disconnected; },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
    reduce(value) { preference.matches = value; preference.dispatch("change"); },
  };
}

test("the example waits offscreen and preserves the existing collection", () => {
  const d = cycle();
  assert.equal(d.amount("budget"), 30);
  assert.equal(d.amount("value"), 80);
  assert.equal(d.fields.count.textContent, "8");
  assert.equal(d.root.attributes.get("data-cycle-added"), "0");
  assert.equal(d.tasks.size, 0);
  assert.ok(!d.root.classes.has("is-cycle-playing"));
  d.advance(20000);
  assert.equal(d.stage(), "initial");
});

test("autoplay requires fifteen percent visibility and ignores entries for other elements", () => {
  const d = cycle();
  assert.deepEqual(Array.from(d.observerOptions.threshold), [0, 0.15]);
  d.visible(true, 0.01);
  d.advance(5000);
  assert.equal(d.tasks.size, 0);
  assert.equal(d.stage(), "initial");
  d.visible(true, 0.1499);
  assert.equal(d.tasks.size, 0);
  d.visible(true, 0.15);
  d.advance(400);
  assert.equal(d.tasks.size, 1);
  d.intersections([{ target: {}, isIntersecting: false, intersectionRatio: 0 }]);
  assert.equal(d.tasks.size, 1, "an unrelated entry must not pause this scene");
  d.visible(true, 0.1499);
  assert.equal(d.tasks.size, 0);
  d.advance(5000);
  d.intersections([{ target: {}, isIntersecting: true, intersectionRatio: 1 }]);
  assert.equal(d.tasks.size, 0, "an unrelated entry must not resume this scene");
  d.visible(true, 0.15);
  d.advance(399);
  assert.equal(d.stage(), "initial");
  d.advance(1);
  assert.equal(d.stage(), "purchase");
});

test("a failed observation disconnects the observer and retains the static finished example", () => {
  const d = cycle({ brokenObserve: true });
  assert.equal(d.disconnected, true);
  assert.equal(d.stage(), "complete");
  assert.equal(d.amount("budget"), 0);
  assert.equal(d.amount("value"), 110);
  assert.equal(d.tasks.size, 0);
});

test("money is debited at the gate and collection value increases only when the book lands", () => {
  const d = cycle();
  d.visible();
  d.advance(800);
  assert.equal(d.stage(), "purchase");
  d.advance(1319);
  assert.equal(d.amount("budget"), 30);
  assert.equal(d.amount("value"), 80);
  d.advance(1);
  assert.equal(d.stage(), "purchase", "debit must not restart the flight");
  assert.equal(d.amount("budget"), 20);
  assert.equal(d.amount("value"), 80);
  assert.equal(d.fields.count.textContent, "8");
  d.advance(879);
  assert.equal(d.fields.count.textContent, "8");
  d.advance(1);
  assert.equal(d.stage(), "landed");
  assert.equal(d.amount("value"), 90);
  assert.equal(d.fields.count.textContent, "9");
  assert.equal(d.root.attributes.get("data-cycle-added"), "1");
});

test("exactly three purchases exhaust the budget and the next book stays unpurchased throughout its return", () => {
  const d = cycle();
  d.visible();
  d.advance(800);
  for (let purchase = 0; purchase < 3; purchase += 1) {
    d.advance(1320);
    assert.equal(d.amount("budget"), 30 - 10 * (purchase + 1));
    assert.equal(d.amount("value"), 80 + 10 * purchase);
    d.advance(880);
    assert.equal(d.amount("budget") + d.amount("value"), 110);
    assert.equal(d.fields.count.textContent, String(9 + purchase));
    d.advance(220);
  }
  assert.equal(d.stage(), "blocked");
  assert.equal(d.amount("budget"), 0);
  assert.equal(d.amount("value"), 110);
  assert.equal(d.root.attributes.get("data-cycle-added"), "3");
  d.advance(1900);
  assert.equal(d.stage(), "blocked");
  assert.equal(d.amount("budget"), 0, "the extra attempt cannot spend more money");
  assert.equal(d.amount("value"), 110, "the rejected book cannot increase collection value");
  assert.equal(d.fields.count.textContent, "11");
  assert.equal(d.root.attributes.has("data-cycle-charge"), false);
  d.advance(1899);
  assert.equal(d.stage(), "blocked");
  assert.equal(d.amount("value"), 110);
  d.advance(1);
  assert.equal(d.stage(), "complete");
});

test("zero budget stays blocked without selling books, refilling money or running more timers", () => {
  const d = cycle();
  d.visible();
  d.advance(11860);
  assert.equal(d.stage(), "complete");
  assert.equal(d.amount("budget"), 0);
  assert.equal(d.amount("value"), 110);
  assert.equal(d.fields.count.textContent, "11");
  assert.equal(d.tasks.size, 0);
  assert.ok(!d.root.classes.has("is-cycle-playing"));
  d.visible(false);
  d.visible();
  d.hidden();
  d.hidden(false);
  d.advance(120000);
  assert.equal(d.amount("budget"), 0);
  assert.equal(d.amount("value"), 110);
  assert.equal(d.fields.count.textContent, "11");
  assert.equal(d.tasks.size, 0);
});

test("offscreen and hidden scenes pause mid-flight and resume with the exact remaining delay", () => {
  for (const pause of [(d) => d.visible(false), (d) => d.hidden()]) {
    const d = cycle();
    d.visible();
    d.advance(2400);
    assert.equal(d.amount("budget"), 20);
    assert.equal(d.amount("value"), 80);
    const stale = d.callbacks.at(-1);
    pause(d);
    assert.equal(d.tasks.size, 0);
    assert.ok(!d.root.classes.has("is-cycle-playing"));
    stale();
    d.advance(30000);
    assert.equal(d.amount("value"), 80, "a canceled timeout cannot add a book while hidden");
    d.hidden(false);
    d.visible();
    d.advance(599);
    assert.equal(d.amount("value"), 80);
    d.advance(1);
    assert.equal(d.amount("value"), 90);
    assert.equal(d.amount("budget"), 20, "resuming must not debit twice");
  }
});

test("the rejected book pauses on its return and finishes without changing the collection or budget", () => {
  for (const pause of [(d) => d.visible(false), (d) => d.hidden()]) {
    const d = cycle();
    d.visible();
    d.advance(11260);
    assert.equal(d.stage(), "blocked");
    assert.equal(d.amount("budget"), 0);
    assert.equal(d.amount("value"), 110);
    assert.equal(d.fields.count.textContent, "11");
    const stale = d.callbacks.at(-1);
    pause(d);
    assert.equal(d.tasks.size, 0);
    assert.ok(!d.root.classes.has("is-cycle-playing"));
    stale();
    d.advance(30000);
    assert.equal(d.stage(), "blocked", "a canceled timeout cannot complete the return while hidden");
    assert.equal(d.amount("budget"), 0);
    assert.equal(d.amount("value"), 110);
    assert.equal(d.fields.count.textContent, "11");
    d.hidden(false);
    d.visible();
    d.advance(599);
    assert.equal(d.stage(), "blocked", "resuming preserves the unfinished return duration");
    d.advance(1);
    assert.equal(d.stage(), "complete");
    assert.equal(d.amount("budget"), 0);
    assert.equal(d.amount("value"), 110);
    assert.equal(d.fields.count.textContent, "11");
    assert.equal(d.tasks.size, 0);
    assert.ok(!d.root.classes.has("is-cycle-playing"));
    d.advance(60000);
    assert.equal(d.tasks.size, 0);
  }
});

test("repeated observer events and visibility changes do not duplicate milestone timers", () => {
  const d = cycle();
  d.visible();
  d.advance(2400);
  d.visible();
  d.hidden(false);
  d.visible();
  assert.equal(d.tasks.size, 1);
  d.advance(600);
  assert.equal(d.amount("budget"), 20);
  assert.equal(d.amount("value"), 90);
  assert.equal(d.fields.count.textContent, "9");
});

test("reduced motion and missing browser APIs provide the finished example without timers", () => {
  for (const options of [{ reduced: true }, { observer: false }, { media: false }, { brokenObserver: true }, { brokenObserve: true }]) {
    const d = cycle(options);
    d.visible();
    d.advance(60000);
    assert.equal(d.stage(), "complete");
    assert.equal(d.amount("budget"), 0);
    assert.equal(d.amount("value"), 110);
    assert.equal(d.fields.count.textContent, "11");
    assert.equal(d.tasks.size, 0);
    assert.ok(!d.root.classes.has("is-cycle-ready"));
    assert.ok(!d.root.classes.has("is-cycle-playing"));
  }
});

test("a reduced-motion change cancels pending work and returning to motion starts a fresh example", () => {
  const d = cycle();
  d.visible();
  d.advance(2400);
  const stale = d.callbacks.at(-1);
  d.reduce(true);
  stale();
  assert.equal(d.tasks.size, 0);
  assert.equal(d.amount("value"), 110);
  d.reduce(false);
  assert.equal(d.stage(), "initial");
  assert.equal(d.amount("budget"), 30);
  assert.equal(d.amount("value"), 80);
  d.advance(3000);
  assert.equal(d.amount("value"), 90);
});

test("the browser controller survives Worker-style bundling and name preservation", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-budget.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const d = cycle({ script: bundled.LANDING_BUDGET_SCRIPT });
  d.visible();
  d.advance(11860);
  assert.equal(d.stage(), "complete");
  assert.equal(d.amount("budget"), 0);
  assert.equal(d.amount("value"), 110);
  assert.equal(d.tasks.size, 0);
});
