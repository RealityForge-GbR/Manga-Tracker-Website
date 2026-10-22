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

  let permanentlyClosed = preference.matches;
  let hasStarted = false;
  let viewport;
  // A missing viewport width keeps the established desktop fallback unchanged.
  try { if (window.innerWidth > 0) viewport = window.matchMedia?.("(max-width: 760px)"); } catch {}
  function desktop() {
    let completed = permanentlyClosed || preference.matches;
    let disposed = false;
    let visible = false;
    let reachedMidpoint = false;
    let observing = false;
    let ready = false;
    let playing = false;
    let observer;
    function sync() {
      if (disposed) return;
      if (preference.matches) completed = permanentlyClosed = true;
      const nextReady = !completed;
      const nextPlaying = nextReady && reachedMidpoint && visible && !document.hidden;
      if (nextPlaying) hasStarted = true;
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
    const cancelGate = watchMidpoint(root, () => { reachedMidpoint = true; sync(); }, () => { completed = permanentlyClosed = true; sync(); });
    if (!cancelGate) { observer.disconnect(); return; }
    const onEnd = (event) => {
      if (event.animationName !== "privacy-lock-shut") return;
      completed = permanentlyClosed = true;
      sync();
      observing = false;
      observer.disconnect();
      cancelGate();
    };
    root.addEventListener("animationend", onEnd);
    document.addEventListener("visibilitychange", sync);
    if (typeof preference.addEventListener === "function") preference.addEventListener("change", sync);
    else preference.addListener(sync);
    sync();
    return () => {
      disposed = true;
      observer?.disconnect();
      cancelGate();
      root.removeEventListener?.("animationend", onEnd);
      document.removeEventListener?.("visibilitychange", sync);
      if (typeof preference.removeEventListener === "function") preference.removeEventListener("change", sync);
      else preference.removeListener?.(sync);
    };

  }

  function mobile() {
    let active = true;
    let visible = false;
    let progress = permanentlyClosed ? 1 : 0;
    let closed = permanentlyClosed;
    let glimmerDone = closed;
    let listening = false;
    let frame;
    let observer;
    const visualViewport = window.visualViewport;
    const passive = {passive:true};
    const clamp = (value) => Math.max(0, Math.min(1, value));
    const ease = (value) => { const p = clamp(value); return p * p * (3 - 2 * p); };
    root.classList.add("is-mobile-lock");
    function paint(value) {
      const p = clamp(value);
      root.style.setProperty("--mobile-lock-progress", p.toFixed(5));
      root.style.setProperty("--mobile-lock-lift", (-18 * (1 - ease(p))).toFixed(4) + "px");
      root.style.setProperty("--mobile-lock-turn", (-18 * (1 - ease(p / .76))).toFixed(4) + "deg");
      root.style.setProperty("--mobile-lock-white", (1 - ease((p - .8) / .2)).toFixed(5));
    }
    function cancelFrame() {
      if (frame === undefined) return;
      window.cancelAnimationFrame(frame);
      frame = undefined;
    }
    function listen(next) {
      if (listening === next) return;
      listening = next;
      const method = next ? "addEventListener" : "removeEventListener";
      window[method]?.("scroll", schedule, passive);
      window[method]?.("resize", schedule, passive);
      visualViewport?.[method]?.("scroll", schedule, passive);
      visualViewport?.[method]?.("resize", schedule, passive);
      if (!next) cancelFrame();
    }
    function releaseWhenDone() {
      if (!closed || !glimmerDone) return;
      listen(false);
      observer?.disconnect();
      document.removeEventListener?.("visibilitychange", sync);
      if (typeof preference.removeEventListener === "function") preference.removeEventListener("change", sync);
      else preference.removeListener?.(sync);
    }
    function syncGlimmer() {
      if (closed && !glimmerDone && visible && !document.hidden && !preference.matches) root.classList.add("is-mobile-lock-glimmer-playing");
      else root.classList.remove("is-mobile-lock-glimmer-playing");
    }
    function finish(showGlimmer) {
      if (closed) return;
      progress = 1;
      closed = permanentlyClosed = true;
      paint(1);
      listen(false);
      glimmerDone = !showGlimmer;
      if (showGlimmer) root.classList.add("is-mobile-lock-snapped");
      syncGlimmer();
      releaseWhenDone();
    }
    function measure() {
      frame = undefined;
      if (!active || closed || !visible || document.hidden || preference.matches) return;
      const box = root.getBoundingClientRect();
      const height = visualViewport?.height > 0 ? visualViewport.height : window.innerHeight;
      const offset = visualViewport?.offsetTop || 0;
      if (!(height > 0 && box.height > 0 && Number.isFinite(box.top))) { finish(false); return; }
      const top = box.top - offset;
      // 10% visible at the bottom starts the close; the symbol's centre at the
      // viewport centre finishes it, independently of scroll speed or screen size.
      const startTop = height - box.height * .1;
      const closeTop = (height - box.height) / 2;
      const next = Math.max(progress, clamp((startTop - top) / (startTop - closeTop)));
      if (next > progress) {
        progress = next;
        hasStarted = true;
        paint(progress);
      }
      if (progress >= 1) finish(true);
    }
    function schedule() {
      if (!active || closed || !visible || document.hidden || preference.matches || frame !== undefined) return;
      frame = window.requestAnimationFrame(measure);
    }
    function sync() {
      if (!active) return;
      if (preference.matches && !closed) finish(false);
      if (preference.matches) {
        glimmerDone = true;
        root.classList.remove("is-mobile-lock-glimmer-playing");
      }
      listen(!closed && visible && !document.hidden && !preference.matches);
      syncGlimmer();
      schedule();
      releaseWhenDone();
    }
    function onEnd(event) {
      if (event.animationName !== "mobile-lock-glimmer-fade") return;
      glimmerDone = true;
      syncGlimmer();
      releaseWhenDone();
    }
    if (typeof root.getBoundingClientRect !== "function" || !root.style?.setProperty || typeof window.requestAnimationFrame !== "function" || typeof window.cancelAnimationFrame !== "function") {
      permanentlyClosed = true;
      root.classList.remove("is-mobile-lock");
      return () => {};
    }
    paint(progress);
    if (closed) return () => { active = false; root.classList.remove("is-mobile-lock"); };
    try {
      observer = new window.IntersectionObserver((entries) => {
        if (!active) return;
        const entry = [...entries].reverse().find((item) => item.target === root);
        if (!entry) return;
        visible = entry.isIntersecting && entry.intersectionRatio >= .1;
        sync();
      }, {threshold:[0,.1]});
      observer.observe(root);
    } catch {
      observer?.disconnect();
      permanentlyClosed = true;
      paint(1);
      return () => { active = false; root.classList.remove("is-mobile-lock"); };
    }
    root.addEventListener("animationend", onEnd);
    document.addEventListener("visibilitychange", sync);
    if (typeof preference.addEventListener === "function") preference.addEventListener("change", sync);
    else preference.addListener(sync);
    sync();
    return () => {
      active = false;
      listen(false);
      observer?.disconnect();
      root.removeEventListener?.("animationend", onEnd);
      document.removeEventListener?.("visibilitychange", sync);
      if (typeof preference.removeEventListener === "function") preference.removeEventListener("change", sync);
      else preference.removeListener?.(sync);
      root.classList.remove("is-mobile-lock", "is-mobile-lock-snapped", "is-mobile-lock-glimmer-playing");
    };
  }
  let dispose;
  function mount() {
    dispose?.();
    root.classList.remove("is-lock-ready", "is-lock-playing");
    dispose = viewport?.matches ? mobile() : desktop();
  }
  function changeMode() {
    // Changing orientation must never reset a lock that has begun closing.
    if (hasStarted) permanentlyClosed = true;
    mount();
  }
  if (typeof viewport?.addEventListener === "function") viewport.addEventListener("change", changeMode);
  else viewport?.addListener?.(changeMode);
  mount();
})();`;
