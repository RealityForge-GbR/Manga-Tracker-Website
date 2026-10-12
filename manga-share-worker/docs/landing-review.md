# Landingpage-Relaunch – lokale Designreview

Stand: 12. Oktober 2026. Branch: `codex/landingpage-relaunch`.
Diese Änderung ist zur Review bestimmt. Kein Merge, Produktionsdeployment,
Workflow-Start, Android-Release oder Eingriff in DNS/TLS/Cloudflare-Routing.

## Gestaltung

Die Startseite verwendet die App-Farben #171217, #211A22, #D7A0AF,
#F7EEE8 und #C2B3B8. Große Typografie, echte App-Aufnahmen in CSS-Geräterahmen,
drei Kapitel für Entdecken/Sammeln/Planen und die originale App-Figur bilden
den Seitenaufbau. Alle Bildinhalte stammen aus der App; keine neu erzeugten
Illustrationen, erfundenen Oberflächen, Bewertungen oder Nutzerzahlen.
Am Hero und im allgemeinen Screenshot-Hinweis ist ausdrücklich erkennbar,
dass alle Screenshots direkt in der echten Android-App aufgenommen wurden.

Die Trust-Texte beziehen sich auf die tatsächlich vorhandenen Kernfunktionen:
Neuerscheinungen, lokale Bibliothek, Einkaufsliste und Budget. Der öffentliche
[Google-Play-Eintrag](https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker)
wurde im Browser geprüft: Version 1.0.1, aktualisiert am 29.09.2026. Die dortige
Beschreibung bestätigt Neuerscheinungen, Sammlung, Kaufplanung, Monatsbudget
und lokale Speicherung. Der App-Code besitzt keinen erforderlichen Login oder
Billing-Zugang für diese Funktionen. Die Website lädt weder externe Schriftarten
noch Analytics und fragt auf der Startseite keine API ab. Die lokale Speicherung
der Sammlung ist keine Behauptung, die App erhebe keinerlei optionale Nutzungsdaten;
die App-Datenschutzerklärung bleibt verlinkt.

„Meine Reihen“ und der erweiterte Bandstatus sind ausdrücklich als Vorschau
gekennzeichnet. Die zugehörige Android-Integration
[PR #23](https://github.com/RealityForge-GbR/Manga-Tracker-Android/pull/23)
war bei der Prüfung offen. Ihre Verfügbarkeit im aktuellen Play-Release wird
nicht behauptet. Auch erweiterte sammlungsbezogene Bandhinweise sind entsprechend
gekennzeichnet.

## Original-App-Assets

- `public/landing/app-icon.png`: unveränderte Datei `assets/app_icon_192.png`
  aus `RealityForge-GbR/Manga-Tracker`, Referenzcommit
  `7423645befb0495313be3201f9d917bac915dfbf`, Git-Blob
  `44e186dcb0e0703fabb2e2e8d7b2f25f15d9c11b`. 192×192 Pixel.
- `public/landing/app-icon-source.png`: unveränderte Datei
  `assets/app_icon_source.png` derselben Referenz, Git-Blob
  `634555034a8beda9484224cb9b7cfa0040b28a7f`. 1254×1254 Pixel;
  ausschließlich Social-Preview, kein schweres Hero-Bild.
- `public/landing/collection-mascot.webp`: unveränderte originale Android-Datei
  `app/src/main/res/drawable-nodpi/achievement_p04.webp`. 683×1024 Pixel.
  Aus dem lokalen Android-Checkout bei
  `5c67bd86a648f8aff63728d2b1f9808777274f1f` gelesen; keine Änderung daran.
  SHA-256: `5a8c5374f9a7509e7dec08c7af298f432fe42c2cc5f3ff0c7b7431965386ddd7`.

Der Nutzer hat die Verwendung der App-Figuren und App-Assets ausdrücklich
freigegeben. Die Freigabe für Manga-Cover wurde als „alles aus der VLB Datenbank“
erteilt. Dies dokumentiert die Nutzerfreigabe, keine neu ermittelte Lizenz.

## Echte Android-Screenshots

Aufgenommen am 12.10.2026 auf dem vorhandenen Samsung SM-S721B über WLAN-ADB.
Paket ausschließlich `eu.realityforge.mangatracker.compose`, Version
`1.0.1-compose`, versionCode `3`, installiert am 12.10.2026 um 09:30:44.
SHA-256 des tatsächlich installierten Debug-APKs:
`c7180d512875fd2775b04750b8a0734b75d3a027af0ab787ec6ed6ad296fce9c`.
Der genaue Build-Commit ist im installierten APK nicht ausgewiesen und wurde
nicht aus dem abweichenden lokalen Checkout abgeleitet. Version, Paket und
APK-Fingerprint sind die gesicherte Herkunftsangabe.

Der Nutzer hat das Vorbereiten entbehrlicher Debug-Testdaten freigegeben.
Die Beispielsammlung verwendet echte VLB-Katalogdaten:

- One Piece: eigene Bände 1, 2, 4, 5; geplanter Kauf Band 112.
- Jujutsu Kaisen: eigener Band 1; geplanter Kauf Band 2.
- Spy x Family: eigener Band 1; geplanter Kauf Band 15.
- Oktober 2026: Testbudget 60 €, geplante Käufe 24,50 €, verfügbar 35,50 €.

Die Titelauswahl folgt dem nachträglichen Nutzerwunsch nach bekannten deutschen
Bestsellern. Alle drei Reihen sind in der geprüften deutschen
[Thalia-Manga-Bestsellerliste](https://www.thalia.de/buch/aktuelles/buch-bestseller/manga)
vertreten. Es wird daraus keine allgemeine Rangliste für Deutschland abgeleitet.
Hanako wird auf der Landingpage nicht verwendet.

| Datei | Tatsächlich aufgenommene Ansicht |
| --- | --- |
| `releases.webp` | Home: Oktober-Neuheiten mit One Piece 113 und Spy x Family 16 |
| `library.webp` | Einzelne Manga: gefüllte Bibliothek mit sechs Testbänden |
| `series.webp` | Meine Reihen: Jujutsu Kaisen, One Piece und Spy x Family |
| `series-status.webp` | One Piece: Band 2 vorhanden, Band 3 fehlend |
| `detail.webp` | Jujutsu Kaisen, Band 1, ISBN 9782889510825 |
| `budget.webp` | Monatsbudget und tatsächliche Test-Kaufplanung |
| `shopping.webp` | Die drei geplanten Testkäufe |
| `notifications.webp` | Echte Benachrichtigungsansicht mit isolierten, simulierten Beispielmeldungen |

Der Nutzer hat anschließend einen gefüllten Benachrichtigungs-Screenshot mit
simulierten Beispieldaten ausdrücklich angefordert. Der ausführende Codex-Chat
„Prüfe PR-Kette vor Integration“ im Projekt Androidstudio-Manga-Tracker hat ihn
am 12.10.2026 um 12:37:29 CEST auf demselben Samsung aufgenommen. Verwendet
wurde dieselbe installierte Debug-App und derselbe APK-Fingerprint wie oben.
Die echte `NotificationScreen` mit Room/Paging und Original-Artwork wurde in
einer isolierten In-Memory-Testfixture verwendet; das Bild wurde nicht montiert
oder nachgezeichnet. Original-PNG: 1080×2400, SHA-256
`eefd3255207b237f1615b8fe398118adb631fc984ad68e2aa11f869fa2eb198e`.

Sichtbare Beispielinhalte: One Piece 111 (fehlend), Jujutsu Kaisen 29
(Einkaufsliste), Spy x Family 15 (Sammlung), ein Collector-Arc-Achievement,
One Piece 89 (Terminverschiebung), Jujutsu Kaisen 27 (fehlend), Spy x Family 14
(Einkaufsliste) und ein teilweise sichtbares weiteres Achievement. Cover und
Figuren sind echte VLB-/App-Assets. Meldungen, Status, Achievement-Vergaben,
relative Zeiten und die Terminverschiebung sind simuliert. Insbesondere die
Termine 15./29.10.2026 zu One Piece 89 sind keine reale Verlagsankündigung.
Die Bildunterschrift nennt ausdrücklich „Echter App-Screenshot“ und
„Simulierte Beispieldaten: Meldungen, Status und Termine“.

Der Screenshot-Agent bestätigt: persönliche Debug-Daten wurden nicht ersetzt;
die isolierte Fixture und temporären Gerätedateien wurden entfernt. Persönliche
Datenbank, WAL, Preferences und Datastores blieben unverändert, abgesehen von
zulässigen Android-Activity-Metadaten und SQLite-SHM. Die ursprüngliche Test-APK
wurde wiederhergestellt. Die Play-Store-App blieb unangetastet. Nachweise liegen
im ignorierten Android-Verzeichnis `.tmp/website-notification-shot-20261012/`
(`README.md`, `cover-provenance.json`, `final-proof.json`). Es wurde dafür kein
Android-Produktcode geändert und kein Commit, Deployment oder Workflow gestartet.

Originale Screenshots: 1080×2400. Zulässige Verarbeitung: Zuschnitt
`(0,110)–(1080,2260)` entfernt Android-Status- und Systemnavigationsleiste;
Verkleinerung auf 720×1433, WebP Qualität 90. Kein UI-Text, Cover, Status oder
Zahlenwert wurde retuschiert. Die CSS-Rahmen sind reine Website-Darstellung.
Original- und Ergebnis-SHA-256, Zuschnitt, Dimensionen und Dateigrößen stehen in
[landing-assets.json](landing-assets.json).

Für die ersten sieben Aufnahmen liegt die private Debug-Sicherung ausschließlich im ignorierten `.local/` und
gehört nicht in Git oder die öffentlichen Assets. Nach der Aufnahme wurden
alle elf gesicherten Datenbank-/Preferences-Dateien byteweise identisch
wiederhergestellt. Die Debug-App wurde danach gestoppt. Keine Neuinstallation;
die Play-Store-App wurde nicht gestartet. Die installierten APKs einschließlich
der vier Produktions-APK-Dateien blieben beim Abschlusscheck identisch.

## Lokale Vorschau und Prüfung

Vom Worker-Verzeichnis aus:

```powershell
npm run preview
```

Vorschau: `http://127.0.0.1:4173/`. Sie verwendet denselben `handleRequest`
wie der Worker und lokale Asset-Dateien. Die Startseite bleibt API-unabhängig;
eine lokal geöffnete Manga-Detailseite liest die bestehende öffentliche API.
Der Server bindet ausschließlich an Loopback, verwendet keine Cloudflare-
Preview-Deployments und startet keine Actions. Für die laufende Designreview
bleibt der lokale Server im Hintergrund geöffnet. Falls er später beendet wird,
kann er mit obigem Befehl erneut gestartet werden.

Browserprüfung in Chrome bei **320, 360, 390, 412, 768, 1280 und 1920 CSS-Pixeln**:
kein horizontaler Überlauf; Hero-Download sichtbar. Wegen des bestehenden
Browserzooms wurden die tatsächlichen CSS-Breiten jeweils per DOM gemessen,
nicht aus der angeforderten Fenstergröße angenommen. Ergebnisse:
[responsive.json](review/responsive.json).
Nach Einbau des Benachrichtigungsbilds wurden dieselben sieben Breiten erneut
geprüft: kein horizontaler Überlauf, das Bild und seine Kennzeichnung auch auf
Tablet-Breiten sichtbar. Nachweis:
[notification-responsive.json](review/notification-responsive.json).

Gespeicherte Website-Aufnahmen: [Desktop](review/desktop.jpg),
[Mobil](review/mobile.jpg) und [Sammlung mobil](review/collection-mobile.jpg).
Die Browser-JPEGs wurden auf den tatsächlich geprüften CSS-Viewport zugeschnitten;
zusätzlicher leerer Rand der Browserautomation wurde entfernt. Seiteninhalte
wurden dabei nicht verändert.

Alle lokalen Bilder wurden im Browser vollständig geladen, ohne fehlgeschlagene
Bilder. Tastaturprüfung: Skip-Link fokussiert `main`; Tab erreicht unmittelbar
den echten Play-CTA mit sichtbarem Fokus. Reduced Motion deaktiviert weiches
Scrollen und Hover-Bewegung. Text-/Flächenfarben und Fokusmarkierung haben
deutlichen Kontrast. Canonical, Open Graph mit Original-Icon, Bilddimensionen,
rechtliche Links und korrekte Google-Play-Ziele sind geprüft.

Lokale Prüfungen: **54/54 Tests bestanden**, einschließlich fünf neuer
Landingpage-Regressionstests. `npm run check` besteht: Tests plus lokaler
Wrangler-Bundlecheck `--dry-run`, ohne Deployment. Die bisherigen Domain-,
Manga-, Fallback-, HEAD-, Sicherheits-, API- und Assetlinks-Tests bleiben erhalten.
Die Detail-Cache-Namespace bleibt v4; nur die neue Startseite erhält eine eigene
Cache-Version, damit eine spätere freigegebene Veröffentlichung keine alte
Startseite aus dem Cache zeigt.

Offen: Designfreigabe und eine danach gesondert autorisierte Veröffentlichung.
Der gefüllte Benachrichtigungs-Screenshot ist jetzt eingebunden; seine Daten
sind als simulierte Beispiele gekennzeichnet.
