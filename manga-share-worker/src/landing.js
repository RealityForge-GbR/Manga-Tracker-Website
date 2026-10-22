import { LANDING_APP_SHOWCASE } from "./landing-app-showcase.js";
import { LANDING_PRIVACY_MARKUP } from "./landing-privacy-section.js";
import { LANDING_STYLES } from "./landing-styles.js";
import { LANDING_MOTION_SCRIPT } from "./landing-motion.js";
import { LANDING_BUDGET_MARKUP } from "./landing-budget-markup.js";
import { renderShelfStory } from "./landing-shelf-story.js";

export const LANDING_ASSETS = new Set([
  "app-icon.png", "app-icon-source.png", "collection-mascot.webp", "releases.webp", "library.webp",
  "series.webp", "series-status.webp", "detail.webp", "budget.webp", "shopping.webp", "notifications.webp",
  "manga-cat-still.webp", "manga-cat-sprite.webp", "manga-shelf-illustration.webp",
].map((name) => `/landing/${name}`));

const PLAY = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";
const description = "Verwalte deine Manga und Light Novels, entdecke monatliche Neuerscheinungen und plane deine nächsten Käufe.";
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const downloadIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/></svg>';
function cta() { return `<a class="button store-download" href="${PLAY}" aria-label="Manga Tracker kostenlos bei Google Play herunterladen">${downloadIcon}<span class="store-label"><strong>Kostenlos herunterladen</strong><small>bei Google Play</small></span></a>`; }
function responsiveCopy(wide, mobile) { return `<span class="wide-copy">${wide}</span><span class="mobile-copy">${mobile}</span>`; }
function catScene() {
  return `<div class="cat-scene" data-cat-scene>
    <div class="manga-shelf" aria-hidden="true"></div>
    <div class="shelf-books" aria-hidden="true"><span></span><span></span><span></span></div>
    <a class="button cat-cta" href="${PLAY}" aria-label="Manga Tracker kostenlos bei Google Play herunterladen"><svg class="download-symbol" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/></svg><span class="cat-cta-label"><strong>Kostenlos herunterladen</strong><small>bei Google Play</small></span></a>
    <div class="cat-art" aria-hidden="true">
      <img class="cat-still" src="/landing/manga-cat-still.webp" alt="" width="512" height="512" loading="lazy" decoding="async">
      <img class="cat-sprite" data-cat-sprite data-src="/landing/manga-cat-sprite.webp" alt="" width="7680" height="512" decoding="async">
    </div>
  </div>`;
}
function phone(name, alt, { hero = false, className = "" } = {}) {
  return `<div class="phone ${className}"><img src="/landing/${name}.webp" alt="${alt}" width="720" height="1433" ${hero ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"></div>`;
}

// Four low-density background books reuse the original screenshot cover crops.
function ambientMangaBooks() {
  const books = [
    ["piece", "-2%", "3%", "54px", "-17deg", "28s", "-3s", "24px"],
    ["spy", "93%", "14%", "50px", "14deg", "34s", "-15s", "29px"],
    ["spy", "-2%", "74%", "60px", "-12deg", "32s", "-22s", "27px"],
    ["piece", "91%", "78%", "57px", "16deg", "26s", "-9s", "25px"],
  ];
  return `<div class="hero-book-field" aria-hidden="true">${books.map(([cover,x,y,size,tilt,duration,delay,travel]) => `<span class="hero-ambient-book book-${cover}" style="--book-x:${x};--book-y:${y};--book-size:${size};--book-tilt:${tilt};--book-duration:${duration};--book-delay:${delay};--book-travel:${travel}"><span class="book-cover"></span></span>`).join("")}</div>`;
}

// Each mobile book uses a real cover crop from releases.webp, as on desktop.
// Depth and pose are independent layers driven by scroll progress on mobile.
function mobileMangaCloud() {
  const poses = [
    ["piece", "5%", "7%", "16%", "-25deg", "30deg", "15deg", 1, ".75"],
    ["spy", "76%", "6%", "13%", "28deg", "-25deg", "10deg", 1, ".8"],
    ["spy", "-3%", "45%", "22%", "-26deg", "25deg", "-10deg", 3, "1"],
    ["piece", "81%", "59%", "24%", "24deg", "-35deg", "12deg", 3, "1"],
    ["piece", "18%", "79%", "11%", "-12deg", "-30deg", "15deg", 1, ".65"],
    ["spy", "83%", "32%", "12%", "-17deg", "25deg", "-16deg", 1, ".65"],
  ];
  return `<div class="mobile-manga-cloud" aria-hidden="true">${poses.map(([cover, x, y, w, rz, ry, rx, depth, opacity]) => `<span class="mobile-manga book-${cover}${depth === 3 ? " manga-near" : ""}" style="--x:${x};--y:${y};--w:${w};--rz:${rz};--ry:${ry};--rx:${rx};--depth:${depth};--opacity:${opacity}"><span class="book-cover"></span></span>`).join("")}</div>`;
}

export function renderLandingPage(origin) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#171217">
  <title>Manga Tracker – Manga sammeln und Käufe planen</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${origin}/">
  <link rel="icon" type="image/png" href="/landing/app-icon.png">
  <meta property="og:locale" content="de_DE">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Manga Tracker">
  <meta property="og:title" content="Manga sammeln und Käufe planen">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${origin}/">
  <meta property="og:image" content="${origin}/landing/app-icon-source.png">
  <meta property="og:image:width" content="1254">
  <meta property="og:image:height" content="1254">
  <meta property="og:image:alt" content="Das originale Manga-Tracker-App-Icon">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Manga Tracker – Manga sammeln und Käufe planen">
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
        <h1 id="hero-title">Manga sammeln und Neuheiten entdecken.</h1>
        <div class="hero-actions">${cta()}</div>
        <ul class="hero-benefits"><li>Kostenlos</li><li>Werbefrei</li><li>Keine In-App-Käufe</li></ul>
      </div>
      <figure class="hero-visual" data-floating-hero data-mobile-parallax>
        ${ambientMangaBooks()}
        ${mobileMangaCloud()}
        <div class="hero-back-rig"><div class="hero-bob hero-bob-back">${phone("detail", "Manga-Detailansicht von Jujutsu Kaisen in der Android-Entwicklungsversion", { className: "hero-back" })}</div></div>
        <div class="hero-front-rig"><div class="hero-bob hero-bob-front">${phone("releases", "Echte Android-App: Neuheiten im Oktober mit One Piece und Spy x Family", { hero: true, className: "hero-front" })}</div></div>
      </figure>
    </section>

    ${renderShelfStory()}

    <section id="planung" class="planning section" aria-labelledby="planning-title">
      ${LANDING_BUDGET_MARKUP}
      <div class="planning-grid wrap"><figure>${phone("budget", "Einkaufsliste für One Piece, Jujutsu Kaisen und Spy x Family mit einem Test-Monatsbudget von 60 Euro")}<figcaption>Einkaufsliste & Monatsbudget · Testdaten</figcaption></figure><div class="planning-copy"><h3>Deine Wunschbände.<br>Dein Monatsbudget.</h3><p>${responsiveCopy("Speichere interessante Manga für später und ordne geplante Käufe einem Monat zu. So bleibt neben deinem nächsten Band auch dein Budget im Blick.", "Wunschbände merken, Käufe planen und dein Monatsbudget im Blick behalten.")}</p><div class="notification-copy"><h3>Neue Bände?<br>Bleib auf dem Laufenden.</h3><p>${responsiveCopy("Persönliche Hinweise in der App helfen dir, neue Bände deiner Reihen und Änderungen an Erscheinungsterminen zu bemerken.", "Neue Bände und Terminänderungen deiner Reihen im Blick behalten.")}</p><span class="preview-badge">Erweiterte Bandhinweise in Entwicklung</span><p class="small">Die erweiterten sammlungsbezogenen Bandhinweise werden weiterentwickelt.</p></div></div><figure id="benachrichtigungen" class="notification-shot">${phone("notifications", "Echter App-Screenshot: Benachrichtigungen für One Piece, Jujutsu Kaisen und Spy x Family mit simulierten Beispielmeldungen, Status und Terminen")}<figcaption>Echter App-Screenshot · Entwicklungsvorschau<br>Simulierte Beispieldaten: Meldungen, Status und Termine</figcaption></figure></div>
    </section>

    ${LANDING_PRIVACY_MARKUP}
    <section id="download" class="download wrap" aria-labelledby="download-title">
      <div class="download-heading"><img class="download-icon" src="/landing/app-icon.png" alt="Manga Tracker" width="192" height="192" loading="lazy"><h2 id="download-title">Tritt der Community <em>kostenlos</em> bei!</h2></div>
      <ul class="download-benefits">
        <li>Kostenlos, ohne Werbung und In-App-Käufe</li>
        <li>Manga und Light Novels übersichtlich sammeln</li>
        <li>Manga einfach per Barcode hinzufügen</li>
        <li>Neuerscheinungen, Einkaufsliste und Budget im Blick</li>
        <li>Deine Sammlung bleibt auf deinem Gerät</li>
      </ul>
      ${catScene()}
    </section>
    ${LANDING_APP_SHOWCASE}
  </main>
  <footer class="footer wrap"><a class="brand" href="/" aria-label="Manga Tracker Startseite"><img src="/landing/app-icon.png" alt="" width="192" height="192"><span>Manga Tracker</span></a><p>Eine App von RealityForge GbR</p><nav aria-label="Rechtliches"><a href="https://realityforge.eu/legal-notice/">Impressum</a><a href="https://realityforge.eu/privacy-policy/">Datenschutz Website</a><a href="https://realityforge.eu/privacy-policy/manga-tracker/">Datenschutz App</a></nav></footer>
<script>${LANDING_MOTION_SCRIPT}</script>
</body></html>`;
}
