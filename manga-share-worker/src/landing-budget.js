// Amounts stay in integer cents; only the input and the displayed result use euros.
export function toBudgetCents(value, fallback = 0, minimum = 0, maximum = 100000) {
  let raw = String(value ?? "").trim().replace(",", ".");
  const numeric = Number(raw);
  if (!raw || !Number.isFinite(numeric)) return Math.min(maximum, Math.max(minimum, fallback));
  if (numeric <= minimum / 100) return minimum;
  if (numeric >= maximum / 100) return maximum;
  if (!/^\d*\.?\d+$/.test(raw)) raw = numeric.toFixed(6);
  const [whole = "0", fraction = ""] = raw.split(".");
  const cents = Number(whole || 0) * 100 + Number((fraction + "00").slice(0, 2)) + (Number(fraction[2] || 0) >= 5 ? 1 : 0);
  return Math.min(maximum, Math.max(minimum, cents));
}

export function budgetProjection(budget, price, requestedCount = 0) {
  budget = Number.isFinite(Number(budget)) ? Math.min(100000, Math.max(0, Math.round(Number(budget)))) : 0;
  price = Number.isFinite(Number(price)) ? Math.min(100000, Math.max(1, Math.round(Number(price)))) : 1;
  const count = Math.min(Math.floor(budget / price), Number.isFinite(Number(requestedCount)) ? Math.max(0, Math.floor(Number(requestedCount))) : 0);
  const spent = count * price;
  const remaining = budget - spent;
  return { budget, price, count, spent, remaining, fits: Math.floor(remaining / price) };
}

// Keep browser code literal: Worker bundlers add name wrappers inside live functions.
const BUDGET_CONTROLLER_SOURCE = String.raw`function startBudgetDemo(toBudgetCents, budgetProjection) {
  const root = document.querySelector("[data-budget-demo]");
  if (!root) return;
  const select = (name) => root.querySelector("[data-budget-" + name + "]");
  const input = select("input");
  const range = select("range");
  const priceInput = root.querySelector("[data-price-input]");
  const buy = select("buy");
  const reset = select("reset");
  const toggle = select("toggle");
  const phase = select("phase");
  const live = select("live");
  if (!input || !range || !priceInput || !buy || !reset || !toggle || !phase) return;
  const currency = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  const money = (cents) => currency.format(cents / 100);
  const volumes = [...root.querySelectorAll("[data-budget-volume]")];
  let state = budgetProjection(toBudgetCents(input.value, 10000), toBudgetCents(priceInput.value, 850, 1));
  let reduced;
  try { reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  let hasObserver = false;
  let visible = false;
  let autoEnabled = Boolean(reduced && !reduced.matches);
  let timer;
  let generation = 0;
  let buying = false;
  const canAutoPlay = () => hasObserver && visible && !document.hidden && reduced && !reduced.matches && autoEnabled;
  const atRest = () => state.fits ? "Bereit" : state.remaining ? "Rest reicht nicht" : "Budget aufgebraucht";
  function announce(message) { if (live) live.textContent = message; }
  function clearStep() {
    generation += 1;
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }
  function later(callback, delay) {
    clearStep();
    const current = generation;
    timer = setTimeout(() => {
      if (current !== generation) return;
      timer = undefined;
      callback();
    }, delay);
  }
  function setPhase(message, name = "ready") {
    phase.textContent = message;
    root.setAttribute("data-phase", name);
  }
  function render() {
    for (const [name, value] of [["remaining", money(state.remaining)], ["spent", money(state.spent)], ["count", state.count], ["count-label", state.count === 1 ? "Band" : "Bände"], ["total", money(state.budget)]]) {
      const element = select(name);
      if (element) element.textContent = String(value);
    }
    const fit = select("fit");
    if (fit) fit.textContent = state.fits + (state.fits === 1 ? " Band möglich" : " Bände möglich");
    root.style.setProperty("--budget-level", String(state.budget ? state.remaining / state.budget : 0));
    volumes.forEach((volume, index) => volume.classList.toggle("is-owned", index < state.count));
    buy.disabled = buying || state.fits === 0;
    toggle.hidden = !hasObserver || !reduced || reduced.matches;
    toggle.setAttribute("aria-pressed", String(Boolean(autoEnabled && reduced && !reduced.matches)));
    toggle.textContent = autoEnabled ? "Pause" : "Abspielen";
    root.classList.toggle("is-auto-playing", Boolean(canAutoPlay()));
  }
  function stopStep() {
    clearStep();
    buying = false;
    root.classList.remove("is-buying");
    setPhase(atRest(), state.fits ? "ready" : "exhausted");
  }
  function scheduleRound() {
    if (!canAutoPlay() || buying) return;
    if (!state.fits && state.count === 0) return;
    if (state.fits) {
      later(() => purchase(false), 1500);
      return;
    }
    later(() => {
      if (!canAutoPlay()) return;
      setPhase("Neuer Monat", "reset");
      later(() => {
        if (!canAutoPlay()) return;
        state = budgetProjection(state.budget, state.price);
        setPhase(atRest(), state.fits ? "ready" : "exhausted");
        render();
        // An unaffordable budget stays still until the inputs change.
        if (state.fits) scheduleRound();
      }, 1200);
    }, 2400);
  }
  function commitPurchase(manual) {
    state = budgetProjection(state.budget, state.price, state.count + 1);
    render();
    if (manual) announce("Band hinzugefügt. " + money(state.remaining) + " übrig.");
  }
  function purchase(manual) {
    if (buying || state.fits === 0) return;
    clearStep();
    const animate = reduced && !reduced.matches && !document.hidden && (!hasObserver || visible);
    if (!animate) {
      commitPurchase(manual);
      setPhase(atRest(), state.fits ? "ready" : "exhausted");
      return;
    }
    buying = true;
    setPhase("−" + money(state.price), "buying");
    root.classList.add("is-buying");
    render();
    later(() => {
      commitPurchase(manual);
      later(() => {
        buying = false;
        root.classList.remove("is-buying");
        setPhase(atRest(), state.fits ? "ready" : "exhausted");
        render();
        scheduleRound();
      }, 200);
    }, 900);
  }
  function syncVisibility() {
    if (document.hidden || (hasObserver && !visible) || reduced?.matches) stopStep();
    render();
    if (timer === undefined) scheduleRound();
  }
  function setInputs(source, normalize = true) {
    autoEnabled = false;
    stopStep();
    const budget = toBudgetCents(source === range ? range.value : input.value, state.budget);
    const price = toBudgetCents(priceInput.value, state.price, 1);
    state = budgetProjection(budget, price);
    range.value = String(budget / 100);
    if (normalize) {
      input.value = (budget / 100).toFixed(2);
      priceInput.value = (price / 100).toFixed(2);
    }
    setPhase(atRest(), state.fits ? "ready" : "exhausted");
    render();
    if (normalize) announce("Monatsbudget " + money(budget) + ". Pro Band " + money(price) + ".");
  }
  input.addEventListener("input", () => setInputs(input, false));
  input.addEventListener("change", () => setInputs(input));
  range.addEventListener("input", () => setInputs(range));
  priceInput.addEventListener("input", () => setInputs(priceInput, false));
  priceInput.addEventListener("change", () => setInputs(priceInput));
  buy.addEventListener("click", () => {
    const currentBudget = toBudgetCents(input.value, state.budget);
    const currentPrice = toBudgetCents(priceInput.value, state.price, 1);
    if (currentBudget !== state.budget || currentPrice !== state.price) setInputs(input, false);
    else {
      autoEnabled = false;
      stopStep();
    }
    purchase(true);
    render();
  });
  reset.addEventListener("click", () => {
    autoEnabled = false;
    stopStep();
    state = budgetProjection(state.budget, state.price);
    setPhase(atRest(), state.fits ? "ready" : "exhausted");
    render();
    announce("Beispiel zurückgesetzt. " + money(state.remaining) + " verfügbar.");
  });
  toggle.addEventListener("click", () => {
    autoEnabled = !autoEnabled;
    stopStep();
    render();
    scheduleRound();
    announce(autoEnabled ? "Automatische Vorschau gestartet." : "Automatische Vorschau pausiert.");
  });
  if (typeof window.IntersectionObserver === "function") {
    try {
      const observer = new window.IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        syncVisibility();
      }, { threshold: 0.1 });
      hasObserver = true;
      observer.observe(root);
    } catch { hasObserver = false; }
  }
  document.addEventListener("visibilitychange", syncVisibility);
  if (reduced?.addEventListener) reduced.addEventListener("change", syncVisibility);
  else if (reduced?.addListener) reduced.addListener(syncVisibility);
  root.classList.add("is-budget-ready");
  for (const control of [input, range, priceInput, reset, toggle]) control.disabled = false;
  setPhase(atRest(), state.fits ? "ready" : "exhausted");
  render();
}`;

// One stage timer at a time; CSS moves the decorative money and book between updates.
export const LANDING_BUDGET_SCRIPT = `(() => {\nconst toBudgetCents = ${toBudgetCents.toString()};\nconst budgetProjection = ${budgetProjection.toString()};\n(${BUDGET_CONTROLLER_SOURCE})(toBudgetCents, budgetProjection);\n})();`;
