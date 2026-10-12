import { LANDING_STYLES } from "./landing-styles.js";

export const LANDING_ASSETS = new Set([
  "app-icon.png", "app-icon-source.png", "collection-mascot.webp", "releases.webp", "library.webp",
  "series.webp", "series-status.webp", "detail.webp", "budget.webp", "shopping.webp", "notifications.webp",
].map((name) => `/landing/${name}`));

const PLAY = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";
const description = "Entdecke deutsche Manga-Neuerscheinungen, organisiere deine Sammlung und behalte neue Bände, geplante Käufe und dein Budget im Blick.";
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 4 14 8-14 8Z"/></svg>';
function cta(extra = "") { return `<a class="button ${extra}" href="${PLAY}">${play}<span>Jetzt bei Google Play</span>${arrow}</a>`; }
function phone(name, alt, { hero = false, className = "" } = {}) {
  return `<div class="phone ${className}"><img src="/landing/${name}.webp" alt="${alt}" width="720" height="1433" ${hero ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"></div>`;
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
        <p class="eyebrow"><span></span> Für dein Manga-Regal. Und alles, was noch kommt.</p>
        <h1 id="hero-title">Deine Manga.<br>Deine Reihen.<br><em>Alles im Blick.</em></h1>
        <p class="lead">${description}</p>
        <div class="hero-actions">${cta()}<a class="text-link" href="#entdecken">Die App entdecken <span aria-hidden="true">↓</span></a></div>
        <p class="small hero-note">Für Android <span aria-hidden="true">·</span> Ohne Benutzerkonto</p>
      </div>
      <figure class="hero-visual">
        <div class="hero-disc" aria-hidden="true"></div>
        <div class="visual-label" aria-hidden="true">Dein nächster Lieblingsmanga?</div>
        ${phone("detail", "Manga-Detailansicht von Jujutsu Kaisen in der Android-Entwicklungsversion", { className: "hero-back" })}
        ${phone("releases", "Echte Android-App: Neuheiten im Oktober mit One Piece und Spy x Family", { hero: true, className: "hero-front" })}
        <figcaption>Echte Screenshots aus der Android-App · Entwicklungsversion</figcaption>
      </figure>
    </section>
    <div class="chapter-nav wrap" aria-label="Die App im Überblick"><span>Vom ersten Entdecken<br><strong>bis zum vollständigen Regal.</strong></span><a href="#entdecken"><b>01</b> Entdecken</a><a href="#sammlung"><b>02</b> Sammeln</a><a href="#planung"><b>03</b> Planen</a></div>

    <section id="entdecken" class="discovery wrap section" aria-labelledby="discovery-title">
      <div class="section-heading"><p class="eyebrow">01 / Neues für dein Regal</p><h2 id="discovery-title">Was kommt als Nächstes?<br><em>Finde es heraus.</em></h2><p>Deutsche Manga-Neuerscheinungen auf einen Blick. Stöbere durch aktuelle Titel und sieh dir einen Band genauer an, bevor er auf deine Liste wandert.</p></div>
      <div class="discovery-grid">
        <figure class="discovery-shot">${phone("releases", "Neuerscheinungen nach Monat und Woche in der echten Manga-Tracker-App")}<figcaption>Neuerscheinungen nach Monat und Woche</figcaption></figure>
        <div class="discovery-copy"><span class="tiny-label">Entdecken statt zusammensuchen</span><h3>Vom Cover<br>zu den Details.</h3><p>Cover, Verlag, Erscheinungstermin und Preis helfen dir, deinen nächsten Band einzuordnen. Interessante Titel bleiben auf deiner Einkaufsliste griffbereit.</p><a class="text-link" href="#planung">Deinen nächsten Kauf planen ${arrow}</a><div class="detail-inset">${phone("detail", "Authentische Detailseite mit Manga-Cover und Buchinformationen")}<p>Ein Titel.<br><strong>Alle wichtigen Infos.</strong></p></div></div>
      </div>
    </section>

    <section id="sammlung" class="collection section" aria-labelledby="collection-title">
      <div class="wrap collection-grid">
        <div class="collection-copy"><p class="eyebrow">02 / Dein persönliches Regal</p><h2 id="collection-title">Du sammelst Geschichten.<br><em>Wir helfen beim Überblick.</em></h2><p>Welche Manga stehen schon im Regal? Verwalte deine Bände in einer eigenen Bibliothek und finde sie über die Suche wieder. Deine Sammlung wird auf deinem Gerät gespeichert.</p><ul class="benefits"><li>Vorhandene Bände übersichtlich verwalten</li><li>Die eigene Bibliothek gezielt durchsuchen</li><li>Sammlung und geplante Käufe auseinanderhalten</li></ul><p class="quiet-line">Deine Bibliothek. Dein Tempo. Dein Geschmack.</p></div>
        <figure class="collection-shot">${phone("library", "Testbibliothek mit One Piece, Jujutsu Kaisen und Spy x Family sowie Bibliothekssuche")}<figcaption>Echte App-Aufnahme mit freigegebenen Testdaten</figcaption></figure>
      </div>
      <div class="wrap series-feature"><div class="series-header"><p class="eyebrow">Die nächste Stufe deiner Sammlung</p><h3>Eine Reihe.<br>Ein klarer Überblick.</h3><span class="preview-badge">In Vorbereitung</span><p>„Meine Reihen“ bündelt deine Sammlung nach Reihen. Der Bandstatus zeigt, was du besitzt und wo noch Lücken sind – damit du beim nächsten Band gezielt weitersammeln kannst.</p><p class="small">Diese erweiterten Reihen- und Bandstatus-Funktionen sind noch in Entwicklung und nicht als aktueller Play-Store-Funktionsumfang zugesagt.</p></div><div class="series-shots"><figure>${phone("series", "Meine Reihen in der Android-Entwicklungsversion")}<figcaption>Meine Reihen · Vorschau</figcaption></figure><figure>${phone("series-status", "Bandübersicht mit Besitzstatus in der Android-Entwicklungsversion")}<figcaption>Bandstatus · Vorschau</figcaption></figure></div></div>
    </section>

    <section id="planung" class="planning wrap section" aria-labelledby="planning-title">
      <div class="section-heading"><p class="eyebrow">03 / Vorfreude mit einem Plan</p><h2 id="planning-title">Deine nächsten Käufe.<br><em>Gut geplant.</em></h2><p>Halte fest, welche Manga du als Nächstes kaufen möchtest. Ein Monatsbudget hilft dir, geplante Käufe und den verfügbaren Betrag zusammen zu sehen.</p></div>
      <div class="planning-grid"><figure>${phone("budget", "Einkaufsliste für One Piece, Jujutsu Kaisen und Spy x Family mit einem Test-Monatsbudget von 60 Euro")}<figcaption>Einkaufsliste & Monatsbudget · Testdaten</figcaption></figure><div class="planning-copy"><h3>Deine Wunschbände.<br>Dein Monatsbudget.</h3><p>Speichere interessante Manga für später und ordne geplante Käufe einem Monat zu. So bleibt neben deinem nächsten Band auch dein Budget im Blick.</p><div class="notification-copy"><span class="tiny-label">Passend zu deiner Sammlung</span><h3>Neue Bände?<br>Bleib auf dem Laufenden.</h3><p>Persönliche Hinweise in der App helfen dir, neue Bände deiner Reihen und Änderungen an Erscheinungsterminen zu bemerken.</p><span class="preview-badge">Erweiterte Bandhinweise in Entwicklung</span><p class="small">Die erweiterten sammlungsbezogenen Bandhinweise werden weiterentwickelt.</p></div></div><figure id="benachrichtigungen" class="notification-shot">${phone("notifications", "Echter App-Screenshot: Benachrichtigungen für One Piece, Jujutsu Kaisen und Spy x Family mit simulierten Beispielmeldungen, Status und Terminen")}<figcaption>Echter App-Screenshot · Entwicklungsvorschau<br>Simulierte Beispieldaten: Meldungen, Status und Termine</figcaption></figure></div>
    </section>

    <section class="trust wrap section" aria-labelledby="trust-title"><div><p class="eyebrow">Für deine Sammlung gemacht</p><h2 id="trust-title">Deine Manga.<br><em>Deine Daten.</em></h2></div><dl><div><dt>Ohne Benutzerkonto</dt><dd>Starte mit deiner Sammlung, ohne ein Konto anzulegen.</dd></div><div><dt>Auf deinem Gerät</dt><dd>Bibliothek, Einkaufsliste und Budget werden lokal verwaltet.</dd></div><div><dt>Kostenlos nutzbar</dt><dd>Entdecken, sammeln und planen – kostenlos mit der Android-App.</dd></div><div><dt>Für deutsche Manga-Sammler</dt><dd>Deutsche Ausgaben und Neuerscheinungen stehen im Mittelpunkt.</dd></div></dl></section>
    <section id="download" class="download wrap" aria-labelledby="download-title"><div class="download-copy"><img class="download-icon" src="/landing/app-icon.png" alt="Originales Manga-Tracker-App-Icon" width="192" height="192" loading="lazy"><p class="eyebrow">Dein Regal hat noch Platz für Geschichten.</p><h2 id="download-title">Bereit für deinen<br><em>nächsten Band?</em></h2><p>Manga Tracker begleitet deine Sammlung – vom ersten Entdecken bis zum nächsten Manga im Regal.</p>${cta()}<p class="small">Die aktuell verfügbare Version findest du bei Google Play.</p></div><img class="mascot" src="/landing/collection-mascot.webp" alt="" width="683" height="1024" loading="lazy" decoding="async"></section>
    <p class="version-note wrap">Alle Screenshots wurden direkt in der echten Android-App aufgenommen. Sie zeigen die Android-Entwicklungsversion 1.0.1-compose mit Beispieldaten. Darstellung und Funktionen können vom aktuellen Google-Play-Release abweichen. Vorschaufunktionen sind entsprechend gekennzeichnet.</p>
  </main>
  <footer class="footer wrap"><a class="brand" href="/" aria-label="Manga Tracker Startseite"><img src="/landing/app-icon.png" alt="" width="192" height="192"><span>Manga Tracker</span></a><p>Eine App von RealityForge GbR</p><nav aria-label="Rechtliches"><a href="https://realityforge.eu/legal-notice/">Impressum</a><a href="https://realityforge.eu/privacy-policy/">Datenschutz Website</a><a href="https://realityforge.eu/privacy-policy/manga-tracker/">Datenschutz App</a></nav></footer>
</body></html>`;
}
