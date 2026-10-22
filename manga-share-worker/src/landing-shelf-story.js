import { renderShareScene } from "./landing-share-scene.js";
import { renderScanScene } from "./landing-scan-scene.js";

const ART = "/landing/manga-shelf-illustration.webp";
const exampleBand = "https://mangatracker.de/manga/9783551771575";
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const star = '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="m32 10 6.8 13.8L54 26l-11 10.7L45.6 52 32 44.8 18.4 52 21 36.7 10 26l15.2-2.2Z"/></svg>';

const features = [
  { id: "neuerscheinungen", kind: "release", title: "Neuerscheinungen verfolgen", copy: "Sieh auf einen Blick, welche Manga in diesem Monat erscheinen.", proof: ["releases", "Neuerscheinungen"], link: true },
  { id: "reihen-folgen", kind: "follow", title: "Deinen Reihen folgen", copy: "Bleib bei deinen Lieblingsreihen auf dem Laufenden, wenn neue Bände erscheinen.", proof: ["series", "Meine Reihen"] },
  { id: "reihen-entdecken", kind: "discover", title: "Neue Reihen entdecken", copy: "Stöbere durch Neuheiten und merke dir interessante Bände für später.", proof: ["releases", "Neuheiten entdecken"] },
  { id: "manga-details", kind: "detail", title: "Vom Cover zu den Details", copy: "Öffne einen Band und sieh Verlag, Erscheinungstermin und Preis.", proof: ["detail", "Manga-Details"], link: true },
  { id: "sammlung", kind: "scan", title: "Einfach einscannen", copy: "Scanne den Barcode und füge einen Manga deiner Sammlung hinzu." },
  { id: "reihen-ergaenzen", kind: "complete", title: "Deine Reihen ergänzen", copy: "Füge mehrere Bände gemeinsam hinzu und behalte die Lücken in deinen Reihen im Blick.", proof: ["series-status", "Bandstatus"] },
  { id: "sammlungswert", kind: "value", title: "Was steht in deinem Regal?", copy: "Mit jedem weiteren Band wächst der Wert deiner Sammlung.", value: true },
  { id: "sammelerfolge", kind: "achievement", title: "Sammelerfolge freischalten", copy: "Schalte beim Sammeln Achievements frei und entdecke deine nächsten Ziele." },
  { id: "manga-teilen", kind: "share", title: "Manga weiterempfehlen", copy: "Teile einen Manga mit Freunden – per Link direkt zu Cover und Details." },
];

function proof([image, caption]) {
  return `<details class="shelf-evidence"><summary>App-Ansicht ansehen ${arrow}</summary><figure class="shelf-proof"><img src="/landing/${image}.webp" alt="Originale Manga-Tracker-App: ${caption}" width="720" height="1433" loading="lazy" decoding="async"><figcaption>${caption}</figcaption></figure></details>`;
}

function action(kind) {
  if (kind === "share") return renderShareScene();
  if (kind === "scan") return renderScanScene();
  const books = [0, 1, 2].map((index) => `<span class="shelf-moving-book" style="--book-index:${index};--spine-x:-${160 + index * 45}px"><i></i></span>`).join("");
  return `<div class="shelf-action" aria-hidden="true"><span class="shelf-row-highlight"></span>${books}${kind === "follow" ? `<span class="shelf-follow-mark">${star}</span>` : ""}${kind === "achievement" ? `<span class="shelf-award">${star}</span>` : ""}</div>`;
}

export function renderShelfStory() {
  return `<section id="entdecken" class="shelf-story wrap" data-shelf-story aria-labelledby="shelf-neuerscheinungen-title">
    <div class="shelf-tower" aria-hidden="true">${Array.from({ length: 3 }, () => `<img src="${ART}" alt="" width="887" height="1774" loading="lazy" decoding="async">`).join("")}</div>
    <div class="shelf-steps">${features.map((feature, index) => `
      <article id="${feature.id}" class="shelf-step shelf-feature-${feature.kind}" data-shelf-step style="--shelf-row:${index % 3}">
        <div class="shelf-mobile-art" aria-hidden="true"><img src="${ART}" alt="" width="887" height="1774" loading="lazy" decoding="async"></div>
        ${action(feature.kind)}
        <div class="shelf-bubble">
          <h2 id="shelf-${feature.id}-title">${feature.title}</h2>
          <p>${feature.copy}</p>
          ${feature.value ? '<div class="shelf-value"><strong data-shelf-value data-value-from="8500" data-value-to="15300">153,00 €</strong><span>Beispielrechnung · 8,50 € pro Band</span></div>' : ""}
          <div class="shelf-bubble-links">${feature.proof ? proof(feature.proof) : ""}${feature.link ? `<a href="${exampleBand}" class="shelf-example-link">Beispielband öffnen ${arrow}</a>` : ""}</div>
        </div>
      </article>`).join("")}</div>
  </section>`;
}
