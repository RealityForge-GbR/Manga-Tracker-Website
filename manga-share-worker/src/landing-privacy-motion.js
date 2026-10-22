import { LANDING_MIDPOINT_GATE } from "./landing-midpoint-gate.js";

// CSS closes and colours the lock once. JavaScript gates playback and retains the closed state.
// Keep this literal so Worker keepNames helpers cannot leak into browser code.
export const LANDING_PRIVACY_SCRIPT = String.raw`(() => {
  ${LANDING_MIDPOINT_GATE}
  const root = document.querySelector("[data-privacy-lock]");
  if (!root) return;
  root.classList.remove("is-lock-ready", "is-lock-playing");
  let preference;
  try {
    preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  } catch {}
  if (!preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function" || (typeof preference.addEventListener !== "function" && typeof preference.addListener !== "function")) return;
  let completed = preference.matches;
  let visible = false;
  let reachedMidpoint = false;
  let observing = false;
  let ready = false;
  let playing = false;
  let observer;
  function sync() {
    if (preference.matches) completed = true;
    const nextReady = !completed;
    const nextPlaying = nextReady && reachedMidpoint && visible && !document.hidden;
    if (nextReady !== ready) {
      ready = nextReady;
      if (ready) root.classList.add("is-lock-ready");
      else root.classList.remove("is-lock-ready");
    }
    if (nextPlaying !== playing) {
      playing = nextPlaying;
      if (playing) root.classList.add("is-lock-playing");
      else root.classList.remove("is-lock-playing");
    }
  }
  try {
    observer = new window.IntersectionObserver((entries) => {
      if (!observing) return;
      const entry = entries.find((item) => item.target === root);
      if (!entry) return;
      visible = entry.isIntersecting;
      sync();
    }, { rootMargin: "0px", threshold: 0 });
    observer.observe(root);
    observing = true;
  } catch {
    observer?.disconnect();
    return;
  }
  const cancelGate = watchMidpoint(root, () => { reachedMidpoint = true; sync(); }, () => { completed = true; sync(); });
  if (!cancelGate) { observer.disconnect(); return; }
  root.addEventListener("animationend", (event) => {
    if (event.animationName !== "privacy-lock-shut") return;
    completed = true;
    sync();
    observing = false;
    observer.disconnect();
    cancelGate();
  });
  document.addEventListener("visibilitychange", sync);
  if (typeof preference.addEventListener === "function") preference.addEventListener("change", sync);
  else preference.addListener(sync);
  sync();
})();`;
