// Only milestone timers run in JavaScript. CSS owns the flights between them.
export const LANDING_BUDGET_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-budget-cycle]");
  if (!root) return;
  const budgetText = root.querySelector("[data-cycle-budget]");
  const valueText = root.querySelector("[data-cycle-value]");
  const countText = root.querySelector("[data-cycle-count]");
  if (!budgetText || !valueText || !countText) return;
  const START_BUDGET = 2000;
  const PRICE = 1000;
  const BASE_VALUE = 3000;
  const BASE_COUNT = 3;
  const money = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const stages = [
    { name: "initial", duration: 1000, action: "reset" },
    { name: "first", duration: 1200 },
    { name: "first", duration: 1200, action: "debit" },
    { name: "first-done", duration: 700, action: "arrive" },
    { name: "second", duration: 1200 },
    { name: "second", duration: 1200, action: "debit" },
    { name: "second-done", duration: 700, action: "arrive" },
    { name: "blocked", duration: 2400 },
    { name: "complete", duration: 1700 },
    { name: "reset", duration: 700 }
  ];
  const now = () => typeof performance !== "undefined" && typeof performance.now === "function" ? performance.now() : Date.now();
  let reduced;
  try { reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  let observer;
  let visible = false;
  let ready = false;
  let remaining = START_BUDGET;
  let value = BASE_VALUE;
  let count = BASE_COUNT;
  let pending = 0;
  let index = -1;
  let stageName;
  let timer;
  let deadline = 0;
  let delay = 0;
  let generation = 0;
  function render() {
    budgetText.textContent = money.format(remaining / 100);
    valueText.textContent = money.format(value / 100);
    countText.textContent = String(count);
    root.setAttribute("data-cycle-added", String(count - BASE_COUNT));
    root.setAttribute("data-cycle-owned", String(count));
    root.style.setProperty("--cycle-budget-level", String(remaining / START_BUDGET));
  }
  function setStage(name) {
    if (stageName === name) return;
    stageName = name;
    root.setAttribute("data-cycle-stage", name);
  }
  function pause() {
    if (timer !== undefined) {
      delay = Math.max(0, deadline - now());
      clearTimeout(timer);
      timer = undefined;
    }
    generation += 1;
    root.classList.remove("is-cycle-playing");
  }
  function staticExample() {
    pause();
    ready = false;
    index = -1;
    pending = 0;
    remaining = 0;
    value = BASE_VALUE + 2 * PRICE;
    count = BASE_COUNT + 2;
    root.removeAttribute("data-cycle-charge");
    root.classList.remove("is-cycle-ready");
    setStage("complete");
    render();
  }
  function enter(next) {
    index = next % stages.length;
    const stage = stages[index];
    setStage(stage.name);
    if (stage.action === "reset") {
      remaining = START_BUDGET;
      value = BASE_VALUE;
      count = BASE_COUNT;
      pending = 0;
    } else if (stage.action === "debit" && !pending && remaining >= PRICE) {
      remaining -= PRICE;
      pending = PRICE;
      root.setAttribute("data-cycle-charge", stage.name);
    } else if (stage.action === "arrive" && pending === PRICE) {
      value += pending;
      count += 1;
      pending = 0;
    }
    if (stage.action !== "debit") root.removeAttribute("data-cycle-charge");
    delay = stage.duration;
    render();
  }
  const canPlay = () => ready && visible && !document.hidden && reduced && !reduced.matches;
  function schedule() {
    if (!canPlay() || timer !== undefined) return;
    const current = ++generation;
    deadline = now() + delay;
    timer = setTimeout(() => {
      if (current !== generation || !canPlay()) return;
      timer = undefined;
      enter(index + 1);
      schedule();
    }, delay);
  }
  function sync() {
    if (!observer || !reduced || reduced.matches) {
      staticExample();
      return;
    }
    if (!ready) {
      ready = true;
      root.classList.add("is-cycle-ready");
      enter(0);
    }
    if (!canPlay()) {
      pause();
      return;
    }
    root.classList.add("is-cycle-playing");
    schedule();
  }
  staticExample();
  if (reduced && typeof window.IntersectionObserver === "function") {
    try {
      observer = new window.IntersectionObserver((entries) => {
        const entry = [...entries].reverse().find((item) => item.target === root);
        if (!entry) return;
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
        sync();
      }, { threshold: [0, 0.15] });
      observer.observe(root);
    } catch {
      try { observer?.disconnect?.(); } catch {}
      observer = undefined;
    }
  }
  document.addEventListener("visibilitychange", sync);
  if (reduced?.addEventListener) reduced.addEventListener("change", sync);
  else if (reduced?.addListener) reduced.addListener(sync);
  sync();
})();`;
