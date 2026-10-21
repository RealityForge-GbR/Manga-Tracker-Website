import { LANDING_STYLES } from "./landing-styles.js";
import { LANDING_MOTION_SCRIPT } from "./landing-motion.js";
import { LANDING_BUDGET_MARKUP } from "./landing-budget-markup.js";

export const LANDING_ASSETS = new Set([
  "app-icon.png", "app-icon-source.png", "collection-mascot.webp", "releases.webp", "library.webp",
  "series.webp", "series-status.webp", "detail.webp", "budget.webp", "shopping.webp", "notifications.webp",
  "manga-cat-still.webp", "manga-cat-sprite.webp",
].map((name) => `/landing/${name}`));

const PLAY = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";
const description = "Verwalte deine Manga und Light Novels, entdecke monatliche Neuerscheinungen und plane deine nächsten Käufe.";
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 4 14 8-14 8Z"/></svg>';
function cta(extra = "") { return `<a class="button ${extra}" href="${PLAY}">${play}<span>Jetzt bei Google Play</span>${arrow}</a>`; }
function catScene() {
  return `<div class="cat-scene" data-cat-scene>
    ${cta("cat-cta")}
    <div class="cat-art" aria-hidden="true">
      <img class="cat-still" src="/landing/manga-cat-still.webp" alt="" width="512" height="512" loading="lazy" decoding="async">
      <img class="cat-sprite" data-cat-sprite data-src="/landing/manga-cat-sprite.webp" alt="" width="7680" height="512" decoding="async">
    </div>
    <button class="cat-toggle" type="button" data-cat-toggle aria-label="Katzenanimation pausieren" aria-pressed="false" hidden><svg class="cat-pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg><svg class="cat-resume-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg></button>
  </div>`;
}
function phone(name, alt, { hero = false, className = "" } = {}) {
  return `<div class="phone ${className}"><img src="/landing/${name}.webp" alt="${alt}" width="720" height="1433" ${hero ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"></div>`;
}

// Cover textures are crops of the unchanged original releases screenshot.
function portalBooks() {
  const paths = [
    ["piece", "-175px", "-24deg"], ["spy", "130px", "22deg"],
    ["piece", "-65px", "15deg"], ["spy", "205px", "-18deg"],
    ["piece", "-225px", "28deg"], ["spy", "65px", "-32deg"],
    ["piece", "175px", "12deg"], ["spy", "-125px", "-16deg"],
  ];
  return paths.map(([cover, lift, turn], index) => `<span class="portal-book book-${cover}" style="--lift:${lift};--turn:${turn};--delay:-${(index * .8).toFixed(1)}s"><span class="book-cover"></span></span>`).join("");
}

// Each book uses a real cover crop from releases.webp, matching the desktop portal.
// Depth and pose are independent layers so a later parallax controller can move them.
function mobileMangaCloud() {
  const poses = [
    ["piece", "5%", "7%", "16%", "-25deg", "30deg", "15deg", 1, ".75"],
    ["spy", "76%", "6%", "13%", "28deg", "-25deg", "10deg", 1, ".8"],
    ["spy", "-3%", "45%", "22%", "-26deg", "25deg", "-10deg", 3, "1"],
    ["piece", "81%", "59%", "24%", "24deg", "-35deg", "12deg", 3, "1"],
    ["piece", "18%", "79%", "11%", "-12deg", "-30deg", "15deg", 1, ".65"],
    ["spy", "83%", "32%", "12%", "-17deg", "25deg", "-16deg", 1, ".65"],
  ];
  return `<div class="mobile-manga-cloud" aria-hidden="true">${poses.map(([cover, x, y, w, rz, ry, rx, depth, opacity]) => `<span class="mobile-manga book-${cover}" style="--x:${x};--y:${y};--w:${w};--rz:${rz};--ry:${ry};--rx:${rx};--depth:${depth};--opacity:${opacity}"><span class="book-cover"></span></span>`).join("")}</div>`;
}

export function renderLandingPage(origin) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#171217">
  <title>Manga Tracker – Deine Manga. Deine Reihen. Alles im Blick.</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${origin}/">
  <link rel="icon" type="image/png" href="/landing/app-icon.png">
  <meta property="og:locale" content="de_DE">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Manga Tracker">
  <meta property="og:title" content="Deine Manga. Deine Reihen. Alles im Blick.">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${origin}/">
  <meta property="og:image" content="${origin}/landing/app-icon-source.png">
  <meta property="og:image:width" content="1254">
  <meta property="og:image:height" content="1254">
  <meta property="og:image:alt" content="Das originale Manga-Tracker-App-Icon">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Manga Tracker – Alles im Blick.">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${origin}/landing/app-icon-source.png">
  <style>${LANDING_STYLES}</style>
</head>
<body>
  <a class="skip" href="#inhalt">Zum Inhalt springen</a>
  <header class="header wrap">
    <a class="brand" href="/" aria-label="Manga Tracker Startseite"><img src="/landing/app-icon.png" alt="" width="192" height="192"><span>Manga Tracker</span></a>
    <nav aria-label="Hauptnavigation"><a href="#entdecken">Entdecken</a><a href="#sammlung">Sammlung</a><a href="#planung">Kaufplanung</a></nav>
    <a class="header-download" href="${PLAY}">App holen ${arrow}</a>
  </header>
  <main id="inhalt" tabindex="-1">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <h1 id="hero-title">Deine Manga.<br>Deine Reihen.<br><em>Alles im Blick.</em></h1>
        <p class="lead">${description}</p>
        <div class="hero-actions">${cta()}</div>
        <p class="small hero-note">Kostenlos · Werbefrei · Keine In-App-Käufe</p>
      </div>
      <figure class="hero-visual" data-manga-portal>
        <div class="hero-disc" aria-hidden="true"></div>
        ${mobileMangaCloud()}
        ${phone("detail", "Manga-Detailansicht von Jujutsu Kaisen in der Android-Entwicklungsversion", { className: "hero-back" })}
        <div class="hero-front-rig">
          ${phone("releases", "Echte Android-App: Neuheiten im Oktober mit One Piece und Spy x Family", { hero: true, className: "hero-front" })}
          <div class="book-portal" aria-hidden="true">
            <span class="portal-mouth"><span class="portal-ring"></span><span class="portal-ring"></span></span>
            ${portalBooks()}
          </div>
        </div>
        <button class="motion-toggle" type="button" data-motion-toggle aria-label="Animation pausieren" aria-pressed="false" hidden><svg class="pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg><svg class="resume-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg></button>
      </figure>
    </section>

    <section id="entdecken" class="discovery wrap section" aria-labelledby="discovery-title">
      <div class="section-heading"><h2 id="discovery-title">Monatliche Neuerscheinungen.<br><em>Auf einen Blick.</em></h2><p>Sieh, welche Manga im jeweiligen Monat erscheinen. Stöbere durch die Neuheiten und merke dir interessante Bände auf deiner Einkaufsliste.</p></div>
      <div class="discovery-grid">
        <figure class="discovery-shot">${phone("releases", "Neuerscheinungen nach Monat und Woche in der echten Manga-Tracker-App")}<figcaption>Neuerscheinungen nach Monat und Woche</figcaption></figure>
        <div class="discovery-copy"><h3>Vom Cover<br>zu den Details.</h3><p>Cover, Verlag, Erscheinungstermin und Preis helfen dir, deinen nächsten Band einzuordnen. Interessante Titel bleiben auf deiner Einkaufsliste griffbereit.</p><a class="text-link" href="#planung">Deinen nächsten Kauf planen ${arrow}</a><div class="detail-inset">${phone("detail", "Authentische Detailseite mit Manga-Cover und Buchinformationen")}<p>Ein Titel.<br><strong>Alle wichtigen Infos.</strong></p></div></div>
      </div>
    </section>

    <section id="sammlung" class="collection section" aria-labelledby="collection-title">
      <div class="wrap collection-grid">
        <div class="collection-copy"><h2 id="collection-title">Deine Manga-Sammlung.<br><em>Übersichtlich verwaltet.</em></h2><p>Behalte im Blick, welche Bände du schon besitzt. Verwalte deine Manga in einer übersichtlichen Bibliothek und finde einzelne Titel über die Suche wieder.</p><ul class="benefits"><li>Die eigene Bibliothek gezielt durchsuchen</li><li>Sammlung und gewünschte Käufe auseinanderhalten</li><li>Auch für Light Novels geeignet</li></ul></div>
        <figure class="collection-shot">${phone("library", "Testbibliothek mit One Piece, Jujutsu Kaisen und Spy x Family sowie Bibliothekssuche")}<figcaption>Echte App-Aufnahme mit freigegebenen Testdaten</figcaption></figure>
      </div>
      <div class="wrap collection-features">
        <article><h3>Manga per Barcode einscannen</h3><p>Scanne den Barcode eines Manga und füge den Band bequem deiner Sammlung hinzu.</p></article>
        <article><h3>Mehrere Bände auf einmal hinzufügen</h3><p>Wähle mehrere Bände einer Reihe aus und übernimm sie gemeinsam in deine Bibliothek.</p></article>
        <article><h3>Achievements fürs Sammeln freischalten</h3><p>Schalte beim Sammeln Achievements frei und behalte deine Sammelerfolge in der App im Blick.</p></article>
      </div>
      <div class="wrap series-feature"><div class="series-header"><h3>Eine Reihe.<br>Ein klarer Überblick.</h3><p>„Meine Reihen“ bündelt deine Sammlung nach Reihen. Der Bandstatus zeigt, was du besitzt und wo noch Lücken sind – damit du beim nächsten Band gezielt weitersammeln kannst.</p></div><div class="series-shots"><figure>${phone("series", "Meine Reihen in der Android-Entwicklungsversion")}<figcaption>Meine Reihen</figcaption></figure><figure>${phone("series-status", "Bandübersicht mit Besitzstatus in der Android-Entwicklungsversion")}<figcaption>Bandstatus</figcaption></figure></div></div>
    </section>

    <section id="planung" class="planning wrap section" aria-labelledby="planning-title">
      <div class="section-heading"><h2 id="planning-title">Dein Monatsbudget.<br><em>Deine Sammlung wächst.</em></h2></div>
      ${LANDING_BUDGET_MARKUP}
      <div class="planning-grid"><figure>${phone("budget", "Einkaufsliste für One Piece, Jujutsu Kaisen und Spy x Family mit einem Test-Monatsbudget von 60 Euro")}<figcaption>Einkaufsliste & Monatsbudget · Testdaten</figcaption></figure><div class="planning-copy"><h3>Deine Wunschbände.<br>Dein Monatsbudget.</h3><p>Speichere interessante Manga für später und ordne geplante Käufe einem Monat zu. So bleibt neben deinem nächsten Band auch dein Budget im Blick.</p><div class="notification-copy"><h3>Neue Bände?<br>Bleib auf dem Laufenden.</h3><p>Persönliche Hinweise in der App helfen dir, neue Bände deiner Reihen und Änderungen an Erscheinungsterminen zu bemerken.</p><span class="preview-badge">Erweiterte Bandhinweise in Entwicklung</span><p class="small">Die erweiterten sammlungsbezogenen Bandhinweise werden weiterentwickelt.</p></div></div><figure id="benachrichtigungen" class="notification-shot">${phone("notifications", "Echter App-Screenshot: Benachrichtigungen für One Piece, Jujutsu Kaisen und Spy x Family mit simulierten Beispielmeldungen, Status und Terminen")}<figcaption>Echter App-Screenshot · Entwicklungsvorschau<br>Simulierte Beispieldaten: Meldungen, Status und Termine</figcaption></figure></div>
    </section>

    <section class="trust wrap section" aria-labelledby="trust-title">
      <div><h2 id="trust-title">Deine Manga.<br><em>Deine Daten.</em></h2><p class="affiliate-note"><strong>Affiliate-Hinweis:</strong> Du kannst Manga Tracker freiwillig über Partnerlinks in der App unterstützen. Kaufst du über einen solchen Affiliate-Link, erhalten wir bei qualifizierten Käufen eine Provision. Für dich entstehen keine Mehrkosten.</p></div>
      <dl>
        <div><dt>Kostenlos nutzbar</dt><dd>Manga Tracker ist kostenlos nutzbar.</dd></div>
        <div><dt>Keine In-App-Käufe</dt><dd>Für die App-Funktionen musst du nichts dazukaufen.</dd></div>
        <div><dt>Keine Werbung</dt><dd>Keine Werbebanner oder Werbevideos in der App.</dd></div>
        <div><dt>Kein Datenverkauf</dt><dd>Wir verkaufen deine Daten nicht weiter.</dd></div>
        <div><dt>Ohne Benutzerkonto</dt><dd>Starte mit deiner Sammlung, ohne ein Konto anzulegen.</dd></div>
        <div><dt>Auf deinem Gerät</dt><dd>Deine Sammlung, Einkaufsliste und dein Budget bleiben auf deinem Gerät.</dd></div>
      </dl>
    </section>
    <section id="download" class="download wrap" aria-labelledby="download-title"><div class="download-copy"><img class="download-icon" src="/landing/app-icon.png" alt="Originales Manga-Tracker-App-Icon" width="192" height="192" loading="lazy"><h2 id="download-title">Bereit für deinen<br><em>nächsten Band?</em></h2><p>Manga Tracker begleitet deine Sammlung – vom ersten Entdecken bis zum nächsten Manga im Regal.</p><p class="small">Die aktuell verfügbare Version findest du bei Google Play.</p></div>${catScene()}</section>
  </main>
  <footer class="footer wrap"><a class="brand" href="/" aria-label="Manga Tracker Startseite"><img src="/landing/app-icon.png" alt="" width="192" height="192"><span>Manga Tracker</span></a><p>Eine App von RealityForge GbR</p><nav aria-label="Rechtliches"><a href="https://realityforge.eu/legal-notice/">Impressum</a><a href="https://realityforge.eu/privacy-policy/">Datenschutz Website</a><a href="https://realityforge.eu/privacy-policy/manga-tracker/">Datenschutz App</a></nav></footer>
<script>${LANDING_MOTION_SCRIPT}</script>
</body></html>`;
}
