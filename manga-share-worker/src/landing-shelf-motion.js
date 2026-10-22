// Scroll events request one frame; the illustrated shelf never runs a render loop.
// Keep browser code literal so Worker keepNames helpers cannot leak into it.
export const LANDING_SHELF_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-shelf-story]");
  if (!root) return;
  const steps = Array.from(root.querySelectorAll("[data-shelf-step]"));
  if (!steps.length) return;
  let preference;
  try { preference = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  if (!preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function" || typeof window.requestAnimationFrame !== "function" || typeof window.cancelAnimationFrame !== "function") return;

  const currency = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  const records = steps.map((step) => ({
    step,
    progress: null,
    values: Array.from(step.querySelectorAll("[data-shelf-value]")).map((element) => ({
      element,
      from: Number(element.dataset.valueFrom),
      to: Number(element.dataset.valueTo),
      original: element.textContent,
      cents: null,
    })).filter((value) => Number.isSafeInteger(value.from) && Number.isSafeInteger(value.to)),
  }));
  let visible = false;
  let active = false;
  let frame = null;
  let selected = null;
  let observer;
  let observing = false;
  function select(next) {
    if (next === selected) return;
    selected?.classList.remove("is-shelf-active");
    selected = next;
    selected?.classList.add("is-shelf-active");
  }
  function staticLayout() {
    root.classList.remove("is-shelf-ready");
    select(null);
    for (const record of records) {
      if (record.progress !== null) record.step.style.removeProperty("--shelf-progress");
      record.progress = null;
      for (const value of record.values) {
        if (value.cents !== null) value.element.textContent = value.original;
        value.cents = null;
      }
    }
  }
  function update() {
    frame = null;
    if (!active) return;
    const viewportHeight = window.innerHeight || document.documentElement?.clientHeight || 0;
    if (!(viewportHeight > 0)) return;
    let nearest = null;
    let distance = Infinity;
    for (const record of records) {
      const rect = record.step.getBoundingClientRect();
      const height = Math.max(0, rect.height);
      const raw = (viewportHeight - rect.top) / (height + viewportHeight);
      const progress = Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : 0;
      const next = progress.toFixed(4);
      if (next !== record.progress) {
        record.progress = next;
        record.step.style.setProperty("--shelf-progress", next);
      }
      if (height > 0 && rect.top < viewportHeight && rect.top + height > 0) {
        const nextDistance = Math.abs(rect.top + height / 2 - viewportHeight * 0.45);
        if (nextDistance < distance) {
          distance = nextDistance;
          nearest = record.step;
        }
      }
      const valueProgress = Math.max(0, Math.min(1, (progress - 0.2) * 2.5));
      for (const value of record.values) {
        const cents = Math.round(value.from + (value.to - value.from) * valueProgress);
        if (cents !== value.cents) {
          value.cents = cents;
          value.element.textContent = currency.format(cents / 100);
        }
      }
    }
    select(nearest);
    root.classList.add("is-shelf-ready");
  }
  function schedule() {
    if (active && frame === null) frame = window.requestAnimationFrame(update);
  }
  function sync() {
    const enabled = visible && !preference.matches && !document.hidden;
    if (enabled !== active) {
      active = enabled;
      if (active) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
      }
    }
    if (preference.matches) staticLayout();
    if (active) schedule();
  }
  try {
    observer = new window.IntersectionObserver((entries) => {
      if (!observing) return;
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    }, { rootMargin: "180px 0px", threshold: 0 });
    observer.observe(root);
    observing = true;
  } catch {
    observer?.disconnect();
    return;
  }
  document.addEventListener("visibilitychange", sync);
  if (preference.addEventListener) preference.addEventListener("change", sync);
  else if (preference.addListener) preference.addListener(sync);
  sync();
})();`;
