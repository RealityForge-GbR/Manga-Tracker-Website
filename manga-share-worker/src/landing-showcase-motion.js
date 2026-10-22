// CSS owns each card's motion; this controller only gates loaded, visible mobile cards.
export const LANDING_SHOWCASE_SCRIPT = String.raw`(() => {
  const mountKey = "__mangaShowcaseMotion";
  if (document[mountKey]) return;
  const cards = Array.from(document.querySelectorAll(".showcase-card"));
  if (!cards.length) return;
  let mobile, preference;
  try {
    mobile = window.matchMedia?.("(max-width:760px)");
    preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  } catch { return; }
  const canListen = (query) => typeof query?.addEventListener === "function" || typeof query?.addListener === "function";
  if (typeof mobile?.matches !== "boolean" || typeof preference?.matches !== "boolean" || !canListen(mobile) || !canListen(preference) || typeof window.IntersectionObserver !== "function") return;
  const states = new Map(cards.map((card) => [card, {
    card,
    visible:false,
    images:new Map(Array.from(card.querySelectorAll("img"), (image) => [image, image.complete && image.naturalWidth > 0])),
  }]));
  let active = false;
  let observer;
  function syncCard(state) {
    const ready = active && mobile.matches && !preference.matches && Array.from(state.images.values()).every(Boolean);
    state.card.classList.toggle("is-showcase-card-ready", ready);
    state.card.classList.toggle("is-showcase-card-playing", ready && state.visible && !document.hidden);
  }
  function sync() { states.forEach(syncCard); }
  for (const state of states.values()) {
    for (const image of state.images.keys()) {
      image.addEventListener("load", () => { state.images.set(image, image.naturalWidth > 0); syncCard(state); });
      image.addEventListener("error", () => { state.images.set(image, false); syncCard(state); });
    }
  }
  try {
    observer = new window.IntersectionObserver((entries) => {
      for (const entry of entries) {
        const state = states.get(entry.target);
        if (!state) continue;
        state.visible = entry.isIntersecting && entry.intersectionRatio >= .2;
        syncCard(state);
      }
    }, {threshold:[0,.2]});
    cards.forEach((card) => observer.observe(card));
  } catch {
    try { observer?.disconnect(); } catch {}
    return;
  }
  const listen = (query) => {
    if (typeof query.addEventListener === "function") query.addEventListener("change", sync);
    else query.addListener(sync);
  };
  try {
    document.addEventListener("visibilitychange", sync);
    listen(mobile);
    listen(preference);
  } catch {
    observer.disconnect();
    return;
  }
  document[mountKey] = true;
  active = true;
  sync();
})();`;
