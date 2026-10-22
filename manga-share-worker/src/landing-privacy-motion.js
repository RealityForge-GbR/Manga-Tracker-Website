// CSS owns the lock close-and-colour sequence. JavaScript only gates playback.
// Keep this literal so Worker keepNames helpers cannot leak into browser code.
export const LANDING_PRIVACY_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-privacy-lock]");
  if (!root) return;
  root.classList.remove("is-lock-ready", "is-lock-playing");
  let preference;
  try {
    preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  } catch {}
  if (!preference || typeof preference.matches !== "boolean" || typeof window.IntersectionObserver !== "function" || (typeof preference.addEventListener !== "function" && typeof preference.addListener !== "function")) return;
  let visible = false;
  let observing = false;
  let ready = false;
  let playing = false;
  let observer;
  function sync() {
    const nextReady = !preference.matches;
    const nextPlaying = nextReady && visible && !document.hidden;
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
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      sync();
    }, { threshold: [0, 0.2] });
    observer.observe(root);
    observing = true;
  } catch {
    observer?.disconnect();
    return;
  }
  document.addEventListener("visibilitychange", sync);
  if (typeof preference.addEventListener === "function") preference.addEventListener("change", sync);
  else preference.addListener(sync);
  sync();
})();`;
