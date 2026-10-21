import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { LANDING_BUDGET_SCRIPT, toBudgetCents, budgetProjection } from "../src/landing-budget.js";

test("budget inputs round decimal euros to bounded, integer cents", () => {
  for (const [input, expected] of [["100", 10000], ["8.50", 850], ["8,50", 850], ["0.01", 1], ["1.005", 101], ["10.075", 1008], ["1e2", 10000], ["10000", 100000], ["-2", 0]]) {
    assert.equal(toBudgetCents(input), expected, input);
  }
  for (const input of ["", "no", "Infinity", undefined]) assert.equal(toBudgetCents(input, 850), 850);
  assert.equal(toBudgetCents("0", 850, 1), 1);
});

test("budget purchases cannot spend fractions of a cent or overdraw the budget", () => {
  assert.deepEqual(budgetProjection(10000, 850, 100), { budget: 10000, price: 850, count: 11, spent: 9350, remaining: 650, fits: 0 });
  assert.deepEqual(budgetProjection(1700, 850, 2), { budget: 1700, price: 850, count: 2, spent: 1700, remaining: 0, fits: 0 });
  assert.equal(budgetProjection(0, 850, 1).count, 0);
  assert.equal(budgetProjection(1, 1, 100).remaining, 0);
  assert.equal(budgetProjection(100, 850).fits, 0);
  assert.equal(budgetProjection(Infinity, NaN, Infinity).remaining, 0);
});

function demo({ budget = "100", price = "8.50", reduced = false, observer = true, media = true, script = LANDING_BUDGET_SCRIPT } = {}) {
  class Element {
    constructor(value = "") {
      this.value = value;
      this.textContent = "";
      this.disabled = true;
      this.hidden = true;
      this.events = new Map();
      this.attributes = new Map();
      this.classes = new Set();
      this.classList = {
        add: (name) => this.classes.add(name),
        remove: (name) => this.classes.delete(name),
        toggle: (name, force) => force ? this.classes.add(name) : this.classes.delete(name),
      };
      this.style = { setProperty: (name, value) => this.attributes.set(name, value) };
    }
    addEventListener(name, callback) { this.events.set(name, callback); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    dispatch(name) { this.events.get(name)?.(); }
  }
  const root = new Element();
  const fields = Object.fromEntries(["input", "range", "buy", "reset", "toggle", "phase", "live", "remaining", "spent", "count", "count-label", "fit", "total"].map((name) => [name, new Element()]));
  fields.input.value = budget;
  fields.range.value = budget;
  fields.price = new Element(price);
  fields.volumes = Array.from({ length: 12 }, () => new Element());
  root.querySelector = (selector) => selector === "[data-price-input]" ? fields.price : fields[/^\[data-budget-(.+)\]$/.exec(selector)?.[1]];
  root.querySelectorAll = () => fields.volumes;
  const document = new Element();
  document.hidden = false;
  document.querySelector = () => root;
  const preference = new Element();
  preference.matches = reduced;
  let intersect;
  let clock = 0;
  let nextId = 0;
  const tasks = new Map();
  const scheduled = [];
  const window = {};
  if (media) window.matchMedia = () => preference;
  if (observer) window.IntersectionObserver = class {
    constructor(callback) { intersect = callback; }
    observe() {}
  };
  vm.runInNewContext(script, {
    document, window, Intl,
    setTimeout(callback, delay) {
      assert.equal(tasks.size, 0, "only one stage timer may exist");
      const id = ++nextId;
      tasks.set(id, { callback, at: clock + delay });
      scheduled.push(callback);
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
  return {
    root, fields, document, preference, tasks, scheduled, advance,
    visible(value = true) { intersect?.([{ isIntersecting: value }]); },
    hidden(value = true) { document.hidden = value; document.dispatch("visibilitychange"); },
  };
}

const amount = (field) => field.textContent.replace(/[\s\u00a0]/g, "");

test("automatic example debits exactly once at book arrival and grows the shelf", () => {
  const d = demo();
  assert.equal(d.fields.input.disabled, false);
  assert.equal(d.fields.price.disabled, false);
  assert.equal(d.tasks.size, 0, "no timer before the example becomes visible");
  d.visible();
  d.advance(1500);
  assert.ok(d.root.classes.has("is-buying"));
  d.advance(899);
  assert.equal(d.fields.count.textContent, "0");
  d.advance(1);
  assert.equal(d.fields.count.textContent, "1");
  assert.equal(amount(d.fields.remaining), "91,50€");
  assert.equal(amount(d.fields.spent), "8,50€");
  assert.ok(d.fields.volumes[0].classes.has("is-owned"));
  assert.equal(d.fields.live.textContent, "", "autoplay must not repeatedly interrupt screen readers");
  d.advance(200);
  assert.ok(!d.root.classes.has("is-buying"));
  assert.equal(d.tasks.size, 1);
});

test("hidden or offscreen examples cancel unfinished flights without a delayed debit", () => {
  for (const stop of [(d) => d.hidden(), (d) => d.visible(false)]) {
    const d = demo();
    d.visible();
    d.advance(1500);
    const staleFlight = d.scheduled.at(-1);
    stop(d);
    assert.equal(d.tasks.size, 0);
    assert.ok(!d.root.classes.has("is-buying"));
    staleFlight();
    d.advance(10000);
    assert.equal(d.fields.count.textContent, "0");
    d.hidden(false);
    d.visible();
    d.advance(2400);
    assert.equal(d.fields.count.textContent, "1");
  }
});

test("pause preserves the calculation and manual purchases still work", () => {
  const d = demo();
  d.visible();
  d.advance(2600);
  d.fields.toggle.dispatch("click");
  assert.equal(d.fields.toggle.attributes.get("aria-pressed"), "false");
  assert.equal(d.tasks.size, 0);
  d.hidden();
  d.hidden(false);
  d.advance(20000);
  assert.equal(d.fields.count.textContent, "1");
  d.fields.buy.dispatch("click");
  d.advance(1100);
  assert.equal(d.fields.count.textContent, "2");
  assert.equal(d.tasks.size, 0);
  assert.match(d.fields.live.textContent, /Band hinzugefügt/);
});

test("input changes cancel pending work and reset the example using exact cents", () => {
  const d = demo();
  d.visible();
  d.advance(1500);
  const staleFlight = d.scheduled.at(-1);
  d.fields.input.value = "50.01";
  d.fields.price.value = "7.99";
  d.fields.input.dispatch("change");
  staleFlight();
  assert.equal(d.tasks.size, 0);
  assert.equal(d.fields.count.textContent, "0");
  assert.equal(amount(d.fields.remaining), "50,01€");
  assert.equal(d.fields.fit.textContent, "6 Bände möglich");
  d.fields.buy.dispatch("click");
  d.advance(1100);
  assert.equal(amount(d.fields.remaining), "42,02€");
  d.fields.reset.dispatch("click");
  assert.equal(amount(d.fields.remaining), "50,01€");
  assert.equal(d.fields.count.textContent, "0");
});

test("typing recalculates immediately without rewriting an unfinished decimal input", () => {
  const d = demo();
  d.visible();
  d.advance(1500);
  const staleFlight = d.scheduled.at(-1);
  d.fields.input.value = "50.010";
  d.fields.input.dispatch("input");
  d.fields.price.value = "7.990";
  d.fields.price.dispatch("input");
  staleFlight();
  assert.equal(d.tasks.size, 0);
  assert.equal(d.fields.count.textContent, "0");
  assert.equal(amount(d.fields.remaining), "50,01€");
  assert.equal(d.fields.fit.textContent, "6 Bände möglich");
  assert.equal(d.fields.input.value, "50.010");
  assert.equal(d.fields.price.value, "7.990");
  d.fields.input.dispatch("change");
  assert.equal(d.fields.input.value, "50.01");
  assert.equal(d.fields.price.value, "7.99");
});

test("manual purchases honor the visible inputs even if a native change event was missed", () => {
  const d = demo();
  d.visible();
  d.fields.input.value = "50.01";
  d.fields.price.value = "7.99";
  d.fields.buy.dispatch("click");
  d.advance(1100);
  assert.equal(d.fields.count.textContent, "1");
  assert.equal(d.fields["count-label"].textContent, "Band");
  assert.equal(amount(d.fields.remaining), "42,02€");
  d.fields.buy.dispatch("click");
  d.advance(1100);
  assert.equal(d.fields.count.textContent, "2", "unchanged inputs must preserve completed purchases");
  assert.equal(d.fields["count-label"].textContent, "Bände");
  assert.equal(amount(d.fields.remaining), "34,03€");
});

test("the loop labels the new month before refilling and distinguishes an unaffordable remainder", () => {
  const d = demo({ budget: "17" });
  d.visible();
  d.advance(5200);
  assert.equal(d.fields.count.textContent, "2");
  assert.equal(d.fields.phase.textContent, "Budget aufgebraucht");
  d.advance(2400);
  assert.equal(d.fields.phase.textContent, "Neuer Monat");
  assert.equal(amount(d.fields.remaining), "0,00€");
  d.advance(1200);
  assert.equal(amount(d.fields.remaining), "17,00€");
  assert.equal(d.fields.count.textContent, "0");
  const small = demo({ budget: "7" });
  small.visible();
  small.advance(10000);
  assert.equal(small.fields.phase.textContent, "Rest reicht nicht");
  assert.equal(small.fields.buy.disabled, true);
  assert.equal(small.tasks.size, 0);
});

test("reduced motion and missing browser observers retain a working manual calculator", () => {
  for (const options of [{ reduced: true }, { observer: false }, { media: false }]) {
    const d = demo(options);
    d.visible();
    d.advance(20000);
    assert.equal(d.fields.toggle.hidden, true);
    assert.equal(d.fields.count.textContent, "0");
    d.fields.buy.dispatch("click");
    d.advance(1100);
    assert.equal(d.fields.count.textContent, "1");
    assert.equal(d.tasks.size, 0);
  }
});

test("changing reduced-motion preference stops autoplay without losing completed purchases", () => {
  const d = demo();
  d.visible();
  d.advance(2600);
  d.preference.matches = true;
  d.preference.dispatch("change");
  assert.equal(d.tasks.size, 0);
  assert.equal(d.fields.count.textContent, "1");
  d.fields.buy.dispatch("click");
  assert.equal(d.fields.count.textContent, "2");
  assert.equal(d.tasks.size, 0);
});

test("the browser controller survives Worker-style name preservation and minification", async () => {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL("../src/landing-budget.js", import.meta.url))],
    bundle: true, write: false, format: "esm", platform: "browser", keepNames: true, minify: true, logLevel: "silent",
  });
  const bundled = await import("data:text/javascript;base64," + Buffer.from(outputFiles[0].text).toString("base64"));
  const d = demo({ script: bundled.LANDING_BUDGET_SCRIPT });
  d.visible();
  d.advance(2400);
  assert.equal(d.fields.count.textContent, "1");
  assert.equal(amount(d.fields.remaining), "91,50€");
  d.fields.input.value = "10.075";
  d.fields.input.dispatch("change");
  assert.equal(amount(d.fields.remaining), "10,08€");
});
