import { LANDING_BARCODE_MORPH_MARKUP } from "./landing-barcode-morph.js";

export const LANDING_PLANNING_DETAILS = `
<div id="sammlung" class="budget-details wrap">
  <figure class="budget-device-scene" aria-label="Originalansicht der Budgetplanung in einem Android-Mockup">
    <div class="budget-device">
      <span class="budget-device-back" aria-hidden="true"></span>
      <span class="budget-device-camera" aria-hidden="true"></span>
      <img src="/landing/budget.webp" alt="Einkaufsliste für One Piece, Jujutsu Kaisen und Spy x Family mit einem Test-Monatsbudget von 60 Euro" width="720" height="1433" loading="lazy" decoding="async">
    </div>
  </figure>
  <div class="budget-explanations">
    <article>
      <h3>Setze dein Monatsbudget.</h3>
      <p>Lege fest, wie viel du im Monat für Manga ausgeben möchtest. Merke dir Wunschbände und ordne geplante Käufe einem Monat zu.</p>
      <p>Du siehst, was du bereits eingeplant hast und wie viel noch übrig ist.</p>
    </article>
    <article>
      <h3>Teile Manga mit Freunden.</h3>
      <p>Empfiehl einen Band per Link weiter. Deine Freunde sehen direkt das Cover und die Details.</p>
    </article>
    <article>
      <h3>Behalte den Wert deiner Sammlung im Blick.</h3>
      <p>Füge deine Bände der Bibliothek hinzu und erfasse den Wert deiner Sammlung.</p>
      <p>So behältst du den Gesamtwert im Blick, während dein Regal wächst.</p>
    </article>
  </div>
  <div class="budget-scan-morph">${LANDING_BARCODE_MORPH_MARKUP}</div>
</div>`;
