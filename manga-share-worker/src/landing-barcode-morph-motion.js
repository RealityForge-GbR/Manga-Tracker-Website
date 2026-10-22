// CSS owns every frame; this controller only starts and pauses visible scenes.
export const LANDING_BARCODE_MORPH_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-barcode-morph]");
  if (!root) return;
  let preference;
  try { preference = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  if (!preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function") return;
  let visible = false;
  let observing = false;
  let observer;
  function sync() {
    root.classList.toggle("is-barcode-morph-ready", !preference.matches);
    root.classList.toggle("is-barcode-morph-moving", visible && !document.hidden && !preference.matches);
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
  sync();
})();`;
