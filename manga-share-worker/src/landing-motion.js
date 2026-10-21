import { LANDING_BUDGET_SCRIPT } from "./landing-budget.js";
import { LANDING_CAT_SCRIPT } from "./landing-cat.js";

// CSS handles the hero frames; the budget uses one timer for each purchase stage.
const HERO_MOTION_SCRIPT = `(() => {
  const scene = document.querySelector("[data-manga-portal]");
  const toggle = document.querySelector("[data-motion-toggle]");
  if (!scene || !toggle || !("IntersectionObserver" in window) || !window.matchMedia) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let paused = false;
  function sync() {
    scene.classList.toggle("is-collecting", visible && !document.hidden && !reduced.matches && !paused);
    toggle.hidden = reduced.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Animation abspielen" : "Animation pausieren");
    toggle.title = paused ? "Animation abspielen" : "Animation pausieren";
  }
  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    sync();
  });
  scene.classList.add("is-motion-ready");
  observer.observe(scene);
  toggle.addEventListener("click", () => { paused = !paused; sync(); });
  document.addEventListener("visibilitychange", sync);
  if (reduced.addEventListener) reduced.addEventListener("change", sync);
  else reduced.addListener(sync);
  sync();
})();`;

export const LANDING_MOTION_SCRIPT = `${HERO_MOTION_SCRIPT}\n${LANDING_BUDGET_SCRIPT}\n${LANDING_CAT_SCRIPT}`;
