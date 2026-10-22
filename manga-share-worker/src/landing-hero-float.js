// CSS owns the gentle float; pointer and scroll events share one render frame.
// Keep browser code literal so Worker keepNames helpers cannot leak into it.
export const LANDING_HERO_FLOAT_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-floating-hero]");
  if (!root) return;
  const surface = root.closest(".hero") || root;
  let viewport;
  let preference;
  try {
    viewport = window.matchMedia?.("(min-width: 761px) and (min-height: 501px), (min-width: 1051px)");
    preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  } catch {}
  let visible = false;
  let active = false;
  let frame = null;
  let point = null;
  let x = "0";
  let y = "0";
  let progress = "0";
  let observer;
  let observing = false;
  root.classList.remove("is-hero-floating");
  root.style.setProperty("--hero-x", x);
  root.style.setProperty("--hero-y", y);
  root.style.setProperty("--hero-progress", progress);
  function resetPointer() {
    point = null;
    if (x !== "0") root.style.setProperty("--hero-x", "0");
    if (y !== "0") root.style.setProperty("--hero-y", "0");
    x = "0";
    y = "0";
  }
  function reset() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    resetPointer();
    if (progress !== "0") root.style.setProperty("--hero-progress", "0");
    progress = "0";
  }
  function update() {
    frame = null;
    if (!active) return;
    const rect = surface.getBoundingClientRect();
    if (point) {
      const rawX = rect.width > 0 ? (point.x - rect.left) / rect.width * 2 - 1 : 0;
      const rawY = rect.height > 0 ? (point.y - rect.top) / rect.height * 2 - 1 : 0;
      const nextX = Number.isFinite(rawX) ? Math.max(-1, Math.min(1, rawX)).toFixed(4) : "0";
      const nextY = Number.isFinite(rawY) ? Math.max(-1, Math.min(1, rawY)).toFixed(4) : "0";
      if (nextX !== x) root.style.setProperty("--hero-x", nextX);
      if (nextY !== y) root.style.setProperty("--hero-y", nextY);
      x = nextX;
      y = nextY;
    }
    const rawProgress = rect.height > 0 ? -rect.top / rect.height : 0;
    const nextProgress = Number.isFinite(rawProgress) ? Math.max(0, Math.min(1, rawProgress)).toFixed(4) : "0";
    if (nextProgress !== progress) root.style.setProperty("--hero-progress", nextProgress);
    progress = nextProgress;
  }
  function schedule() {
    if (active && frame === null) frame = window.requestAnimationFrame(update);
  }
  function move(event) {
    if (!active) return;
    point = { x: event.clientX, y: event.clientY };
    schedule();
  }
  function sync() {
    const enabled = Boolean(viewport.matches && !preference.matches && visible && !document.hidden);
    if (enabled === active) return;
    active = enabled;
    if (active) {
      root.classList.add("is-hero-floating");
      surface.addEventListener("pointermove", move, { passive: true });
      surface.addEventListener("pointerleave", resetPointer, { passive: true });
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();
    } else {
      root.classList.remove("is-hero-floating");
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reset();
    }
  }
  if (!viewport || typeof viewport.matches !== "boolean" || !preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function" || typeof window.requestAnimationFrame !== "function" || typeof window.cancelAnimationFrame !== "function") return;
  try {
    observer = new window.IntersectionObserver((entries) => {
      if (!observing) return;
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    }, { threshold: 0 });
    observer.observe(root);
    observing = true;
  } catch {
    observer?.disconnect();
    return;
  }
  document.addEventListener("visibilitychange", sync);
  for (const query of [viewport, preference]) {
    if (query.addEventListener) query.addEventListener("change", sync);
    else if (query.addListener) query.addListener(sync);
  }
  sync();
})();`;
