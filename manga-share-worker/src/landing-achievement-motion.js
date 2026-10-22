import { LANDING_MIDPOINT_GATE } from "./landing-midpoint-gate.js";

// CSS owns the app-derived spring and petals; JS only gates the visible, loaded scene.
export const LANDING_ACHIEVEMENT_SCRIPT = String.raw`(() => {
  ${LANDING_MIDPOINT_GATE}
  const root = document.querySelector("[data-achievement-demo]");
  if (!root) return;
  const artwork = root.querySelector("img");
  if (!artwork) return;
  let preference;
  try { preference = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  if (!preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function") return;
  let visible = false;
  let reachedMidpoint = false;
  let observing = false;
  let loaded = artwork.complete && artwork.naturalWidth > 0;
  let observer;
  function sync() {
    const ready = loaded && !preference.matches;
    root.classList.toggle("is-achievement-ready", ready);
    root.classList.toggle("is-achievement-playing", ready && reachedMidpoint && visible && !document.hidden);
  }
  artwork.addEventListener("load", () => { loaded = artwork.naturalWidth > 0; sync(); });
  artwork.addEventListener("error", () => { loaded = false; sync(); });
  try {
    observer = new window.IntersectionObserver((entries) => {
      if (!observing) return;
      const entry = entries.find((item) => item.target === root);
      if (!entry) return;
      visible = entry.isIntersecting && entry.intersectionRatio >= .2;
      sync();
    }, {threshold:[0,.2]});
    observer.observe(root);
    observing = true;
  } catch { observer?.disconnect(); return; }
  const cancelGate = watchMidpoint(root, () => { reachedMidpoint = true; sync(); }, () => { loaded = false; sync(); });
  if (!cancelGate) { observer.disconnect(); return; }
  document.addEventListener("visibilitychange", sync);
  if (preference.addEventListener) preference.addEventListener("change", sync);
  else if (preference.addListener) preference.addListener(sync);
  sync();
})();`;
