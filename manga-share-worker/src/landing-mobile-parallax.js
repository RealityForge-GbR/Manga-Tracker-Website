// Only scroll events request a frame; no sensors or perpetual animation loop.
// Keep the browser source literal so Worker bundlers cannot inject helpers.
export const LANDING_MOBILE_PARALLAX_SCRIPT = String.raw`(() => {
  const scene = document.querySelector("[data-mobile-parallax]");
  if (!scene) return;
  const hero = scene.closest(".hero") || scene;
  let viewport;
  let preference;
  try {
    viewport = window.matchMedia?.("(max-width: 760px), (max-width: 1050px) and (max-height: 500px) and (orientation: landscape)");
    preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  } catch {}
  let visible = false;
  let active = false;
  let frame = null;
  let progress = "0";
  let observer;
  scene.style.setProperty("--mobile-progress", progress);
  function reset() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    progress = "0";
    scene.style.setProperty("--mobile-progress", progress);
    scene.classList.remove("is-parallax-active");
  }
  function update() {
    frame = null;
    if (!active) return;
    const rect = hero.getBoundingClientRect();
    const height = rect.height;
    const value = height > 0 ? Math.min(1, Math.max(0, -rect.top / height)) : 0;
    const next = value.toFixed(4);
    if (next !== progress) {
      progress = next;
      scene.style.setProperty("--mobile-progress", progress);
    }
  }
  function schedule() {
    if (active && frame === null) frame = window.requestAnimationFrame(update);
  }
  function sync() {
    const enabled = Boolean(viewport?.matches && preference && !preference.matches && visible && !document.hidden);
    if (enabled !== active) {
      active = enabled;
      if (active) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        scene.classList.add("is-parallax-active");
      } else {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        reset();
      }
    }
    if (active) schedule();
  }
  if (!viewport || !preference || typeof window.IntersectionObserver !== "function" || typeof window.requestAnimationFrame !== "function" || typeof window.cancelAnimationFrame !== "function") return;
  try {
    observer = new window.IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      sync();
    }, { threshold: 0 });
    observer.observe(scene);
  } catch {
    observer?.disconnect();
    reset();
    return;
  }
  document.addEventListener("visibilitychange", sync);
  for (const query of [viewport, preference]) {
    if (query.addEventListener) query.addEventListener("change", sync);
    else if (query.addListener) query.addListener(sync);
  }
  sync();
})();`;
