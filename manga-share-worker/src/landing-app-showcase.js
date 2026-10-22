// Additional visual direction; all existing landing sections remain above it.
const views = [
  { name: "library", title: "Bibliothek", copy: "Manga und Light Novels übersichtlich verwalten.", alt: "Originale Manga-Tracker-Bibliothek mit Jujutsu Kaisen und One Piece", pose: "library" },
  { name: "releases", title: "Neuerscheinungen", copy: "Neue Bände für diesen Monat entdecken.", alt: "Originale App-Startseite mit den Manga-Neuerscheinungen im Oktober", pose: "releases" },
  { name: "detail", title: "Banddetails", copy: "Preis, Verlag und Erscheinungstermin nachsehen.", alt: "Originale Detailansicht von Jujutsu Kaisen, Band 1, in der Manga-Tracker-App", pose: "detail" },
];

export const LANDING_APP_SHOWCASE = `
<section id="app-ansichten" class="app-showcase wrap" aria-labelledby="showcase-title">
  <h2 id="showcase-title">Ein Blick in Manga Tracker.</h2>
  <div class="showcase-gallery" role="region" aria-label="Drei Originalansichten der Android-App" tabindex="0">
    ${views.map((view) => `<article class="showcase-card showcase-${view.pose}">
      <div class="showcase-card-copy"><h3>${view.title}</h3><p>${view.copy}</p></div>
      <figure class="showcase-device"><img src="/landing/${view.name}.webp" alt="${view.alt}" width="720" height="1433" loading="lazy" decoding="async"></figure>
    </article>`).join("")}
  </div>
</section>`;
