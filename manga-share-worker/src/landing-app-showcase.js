import { LANDING_MOBILE_SHARE_SCENE } from "./landing-mobile-share-scene.js";
import { LANDING_ACHIEVEMENT_MARKUP } from "./landing-achievement-scene.js";

const views = [
  { id: "entdecken", name: "releases", title: "Neuerscheinungen verfolgen", copy: "Sieh, welche neuen Bände in diesem Monat erscheinen.", alt: "Originale App-Startseite mit den Manga-Neuerscheinungen im Oktober", pose: "releases" },
  { title: "Achievements bekommen", copy: "Schalte beim Sammeln deine nächsten Erfolge frei.", pose: "achievements" },
  { name: "series", title: "Reihen folgen", copy: "Deine Lieblingsreihen auf einen Blick.", alt: "Originale Reihenübersicht in Manga Tracker", pose: "series" },
  { title: "Teile Manga mit Freunden.", copy: "Empfiehl einen Band per Link weiter. Deine Freunde sehen direkt das Cover und die Details.", pose: "sharing", mobileOnly: true },
];

export const LANDING_APP_SHOWCASE = `
<section id="app-ansichten" class="app-showcase wrap" aria-label="Funktionen von Manga Tracker">
  <div class="showcase-gallery" role="region" aria-label="Funktionen von Manga Tracker" tabindex="0">
    ${views.map((view) => `<article${view.id ? ` id="${view.id}"` : ""} class="showcase-card showcase-${view.pose}${view.mobileOnly ? " showcase-mobile-only" : ""}">
      <div class="showcase-card-copy"><h3>${view.title}</h3><p>${view.copy}</p></div>
      ${view.pose === "sharing" ? LANDING_MOBILE_SHARE_SCENE : view.pose === "achievements" ? LANDING_ACHIEVEMENT_MARKUP : `<figure class="showcase-device"><img src="/landing/${view.name}.webp" alt="${view.alt}" width="720" height="1433" loading="lazy" decoding="async"></figure>`}
    </article>`).join("")}
  </div>
</section>`;
