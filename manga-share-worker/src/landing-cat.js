// CSS advances the sprite; this controller only reacts to loading and visibility.
// Keep it literal so Worker bundlers cannot inject helpers into the browser source.
export const LANDING_CAT_SCRIPT = String.raw`(() => {
  const root = document.querySelector("[data-cat-scene]");
  if (!root) return;
  const sprite = root.querySelector("[data-cat-sprite]");
  const toggle = root.querySelector("[data-cat-toggle]");
  if (!sprite || !toggle) return;
  let preference;
  try { preference = window.matchMedia?.("(prefers-reduced-motion: reduce)"); } catch {}
  let visible = false;
  let paused = false;
  let ready = false;
  let requested = false;
  let failed = false;
  let decoding = false;
  let hasObserver = false;
  function sync() {
    root.classList.toggle("is-cat-playing", Boolean(ready && hasObserver && visible && !document.hidden && preference && !preference.matches && !paused));
    toggle.hidden = !ready || !hasObserver || !preference || preference.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    const label = paused ? "Katzenanimation abspielen" : "Katzenanimation pausieren";
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
  }
  function markReady() {
    if (failed) return;
    ready = true;
    root.classList.add("is-cat-ready");
    sync();
  }
  function imageLoaded() {
    if (ready || failed || decoding) return;
    decoding = true;
    try {
      if (typeof sprite.decode === "function") {
        sprite.decode().then(markReady, () => {
          decoding = false;
          if (sprite.complete && sprite.naturalWidth > 0) markReady();
        });
      } else markReady();
    } catch {
      decoding = false;
      if (sprite.complete && sprite.naturalWidth > 0) markReady();
    }
  }
  function loadSprite() {
    if (requested) return;
    requested = true;
    const source = sprite.getAttribute("data-src") || sprite.getAttribute("src");
    if (!source) return;
    if (sprite.getAttribute("src") !== source) sprite.setAttribute("src", source);
    if (sprite.complete && sprite.naturalWidth > 0) imageLoaded();
  }
  sprite.addEventListener("load", imageLoaded);
  sprite.addEventListener("error", () => {
    failed = true;
    ready = false;
    root.classList.remove("is-cat-ready");
    root.classList.add("is-cat-unavailable");
    sync();
  });
  if (typeof window.IntersectionObserver === "function") {
    let visibilityObserver;
    let preloadObserver;
    try {
      visibilityObserver = new window.IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) loadSprite();
        sync();
      }, { threshold: 0.05 });
      preloadObserver = new window.IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        loadSprite();
        preloadObserver.disconnect();
      }, { rootMargin: "240px 0px" });
      hasObserver = true;
      visibilityObserver.observe(root);
      preloadObserver.observe(root);
    } catch {
      hasObserver = false;
      visibilityObserver?.disconnect();
      preloadObserver?.disconnect();
      loadSprite();
    }
  } else loadSprite();
  toggle.addEventListener("click", () => { paused = !paused; sync(); });
  document.addEventListener("visibilitychange", sync);
  if (preference?.addEventListener) preference.addEventListener("change", sync);
  else if (preference?.addListener) preference.addListener(sync);
  sync();
})();`;
