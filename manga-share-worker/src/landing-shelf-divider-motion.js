// The browser composites the occasional spine pull; JavaScript only pauses it.
export const LANDING_SHELF_DIVIDER_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-shelf-divider]");
  if (!root) return;
  root.classList.remove("is-shelf-divider-moving");
  let preference;
  try { preference = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  if (!preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function") return;
  let visible = false;
  let observing = false;
  let observer;
  function sync() {
    if (visible && !document.hidden && !preference.matches) root.classList.add("is-shelf-divider-moving");
    else root.classList.remove("is-shelf-divider-moving");
  }
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
  if (preference.addEventListener) preference.addEventListener("change", sync);
  else if (preference.addListener) preference.addListener(sync);
})();`;
