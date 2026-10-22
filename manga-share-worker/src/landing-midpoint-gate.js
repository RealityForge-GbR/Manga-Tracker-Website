// Literal browser helper: wait for top-center once, then release the observer.
export const LANDING_MIDPOINT_GATE = String.raw`
function watchMidpoint(target, onReach, onFailure) {
  let gate;
  let done = false;
  let generation = 0;
  function cancel() {
    done = true;
    gate?.disconnect();
    window.removeEventListener?.("resize", arm);
  }
  function arm() {
    if (done) return;
    gate?.disconnect();
    const current = ++generation;
    try {
      const height = window.innerHeight;
      if (!(height > 0)) throw new Error("Missing viewport height");
      gate = new window.IntersectionObserver((entries) => {
        if (done || current !== generation || !entries.some((entry) => entry.target === target && entry.isIntersecting)) return;
        cancel();
        onReach();
      }, {rootMargin:"0px 0px -" + (height / 2) + "px 0px", threshold:0});
      gate.observe(target);
    } catch {
      cancel();
      onFailure();
    }
  }
  arm();
  if (done) return null;
  window.addEventListener?.("resize", arm);
  return cancel;
}
`;
