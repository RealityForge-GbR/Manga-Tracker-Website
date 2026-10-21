# Landingpage-Relaunch – lokale Designreview

Stand: 12. Oktober 2026. Branch: `codex/landingpage-relaunch`.
Diese Änderung ist zur Review bestimmt. Kein Merge, Produktionsdeployment,
Workflow-Start, Android-Release oder Eingriff in DNS/TLS/Cloudflare-Routing.

## Gestaltungsvorgaben vom 21. Oktober 2026

Die vom Nutzer gelieferte Farbpalette ist für die Startseite verbindlich:

| Rolle | Farbe |
| --- | --- |
| Primärfarbe Rosé | #D7A0AF |
| Haupthintergrund | #171217 |
| Kartenhintergrund | #211A22 |
| Erhöhter Hintergrund | #2A202B |
| Bordeaux | #5A3948 |
| Sekundärer Hintergrund | #342735 |
| Haupttext | #F7EEE8 |
| Sekundärtext | #C2B3B8 |
| Dunkler Kontrasttext auf Rosé | #30202A |

Alle kleinen Überschriften oberhalb der Hauptüberschriften sind entfernt.
Zusätzlich entfallen der Hero-Link „Die App entdecken“, die senkrechte Hero-Beschriftung,
der Hero-Bilduntertitel und der allgemeine Screenshot-Hinweis vor dem Footer.
Herkunft und Prüfsummen der vorhandenen Aufnahmen bleiben in dieser Dokumentation
und landing-assets.json erhalten. Am Benachrichtigungsbild bleibt der Hinweis auf
simulierte Beispieldaten bestehen.

Es werden ausschließlich echte App-Aufnahmen verwendet, bei Bedarf Originale aus
Google Play. Keine erfundenen App-Oberflächen oder nachgestellten Screenshots.
Vor einer neuen Ansicht ohne vorhandene Aufnahme wird dem Nutzer die fehlende Quelle genannt.
Im bestehenden Assetbestand fehlen eigene Ansichten von Scanner, Favoriten, Profil und Backup.
Die acht vorhandenen WebPs sind dokumentierte Zuschnitte/Verkleinerungen echter
Android-Aufnahmen; die unbeschnittenen Original-PNGs liegen nicht in diesem Checkout.

### Inhaltliche Grundlage: die zwölf Nutzer-USPs

Die zwölf am 21. Oktober gelieferten USPs sind auf die passenden Bereiche verteilt.
Die Kapitelübersicht „Vom ersten Entdecken bis zum vollständigen Regal“ ist entfernt.
Die Gestaltung bleibt zunächst bestehen; die neuen Textbausteine verwenden eine
schlichte responsive Anordnung innerhalb des Sammlungsbereichs.

| USP | Bereich |
| --- | --- |
| Kostenlos nutzbar | Hero-Kurzzeile und Vertrauensbereich |
| Keine In-App-Käufe | Hero-Kurzzeile und Vertrauensbereich |
| Keine Werbung | Hero-Kurzzeile und Vertrauensbereich |
| Kein Weiterverkauf, persönliche Daten lokal | Vertrauensbereich: Sammlung, Einkaufsliste und Budget konkret benannt |
| Sammlung übersichtlich verwalten | Sammlungsbereich |
| Barcode einscannen | Textbaustein unter der Bibliothek |
| Mehrere Bände einer Reihe hinzufügen | Textbaustein unter der Bibliothek |
| Light Novels | Einleitung und Sammlungsbereich |
| Monatliche Neuerscheinungen | Entdecken |
| Einkaufsliste für gewünschte Manga | Kaufplanung |
| Achievements fürs Sammeln | Textbaustein unter der Bibliothek |
| Freiwillige Affiliate-Unterstützung ohne Mehrkosten | Ausformulierter Hinweis im Vertrauensbereich |

Es fehlen eigene Original-Aufnahmen von Barcode-Scan, Mehrfachauswahl/Reihenimport,
einem Light-Novel-Beispiel und der Achievements-Ansicht. Diese USPs werden als Text
erklärt; die Reihen-/Bandstatus-Aufnahmen werden nicht als Mehrfachimport ausgegeben.
Das vorhandene Achievement-Maskottchen ist Artwork und kein UI-Screenshot.
Außerhalb des Website-Bestands existieren originale Feature-Videos (Achievment.MOV,
Bibliothekreihe 1.MOV und Bibliothekreihe 2.MOV) als mögliche spätere Framequellen;
ihre Inhalte und passende Frames wurden in diesem Schritt nicht geprüft.

Die historischen „In Vorbereitung“-Labels für Meine Reihen und Bandstatus sind
entfernt: Die Funktionen und der Mehrfachimport sind im veröffentlichten Play-Tag
play-v1.0.2-4 (5bd868bb2b128b875805362f3bdf63d36081c792) implementiert. Direkte Belege
sind InventoryScreen.kt (InventorySeriesList), SeriesBrowseScreen.kt
(CollectionStatusIndex) und inventory/add/SeriesImportScreen.kt (Mehrfachauswahl
und Übernahme in die Bibliothek). Die Originalaufnahmen bleiben unverändert.
„Alles bleibt auf dem Gerät“ wird nicht pauschal für jeden technischen Datenaustausch
behauptet, sondern auf die tatsächlich lokal gespeicherten persönlichen Listen bezogen.

### Manga-Portal im Hero

Nur im Landing-Abschnitt fliegen acht dekorative Buch-Elemente zum vorderen Handy.
Die Cover zeigen zwei Ausschnitte aus der vorhandenen unveränderten releases.webp
(One Piece und Spy x Family); es gibt keine erfundenen Screenshots oder zusätzlichen Bilddateien.
Der CSS-Geräterahmen, die Bücher und der Portalsaum sind dekorativ.

Die Animation verändert ausschließlich transform und opacity, ohne Bibliothek,
Canvas, Video, Timer oder JavaScript pro Frame. Auf kleinen Displays bleiben fünf
Bücher aktiv. Ein IntersectionObserver und die Page Visibility API pausieren bei
unsichtbarem Hero bzw. inaktivem Tab. Ein zugänglicher Pausenknopf erhält die manuelle
Pause beim Scrollen. Bei reduzierter Bewegung oder fehlender Browserunterstützung
bleibt die originale Zwei-Handy-Darstellung statisch. Das kleine feste Steuer-Script
wird ausschließlich mit seinem SHA-256-Hash in der CSP freigegeben; die Detailseiten
behalten ihr eigenes Script und ihren bisherigen Cache-Namensraum.

### Interaktive Budget-Beispielrechnung

Der Kaufplanungsbereich zeigt eine eigenständige Website-Illustration mit einem
Budget-Konto, Geldtransfer und wachsendem Manga-Regal. Startwerte: 100 Euro pro
Monat und 8,50 Euro pro Band. Budget (0–1.000 Euro) und Preis (0,01–1.000 Euro)
sind veränderbar. Es handelt sich ausdrücklich um eine Beispielrechnung und keinen
Kauf oder Screenshot der App. Das Buchcover ist ein Ausschnitt der unveränderten
releases.webp, alle übrigen Elemente sind HTML/CSS in der verbindlichen Palette.

Die Rechnung arbeitet in ganzen Cent. Restbudget, Ausgaben und Bandanzahl ändern
sich gemeinsam bei Ankunft des Buchs. Käufe können das Budget nicht unterschreiten.
Die begrenzte Regal-Darstellung nutzt zwölf Elemente, der Zähler zeigt auch größere
Mengen korrekt. Der automatische Durchlauf zeigt vor dem Zurücksetzen einen neuen
Monat an. Manuelle Eingaben pausieren den Durchlauf und beginnen eine neue Rechnung;
Pause, einzelner Beispielkauf und Zurücksetzen bleiben direkt bedienbar.

CSS bewegt drei Münzen und ein Buch ausschließlich per transform/opacity; ein
Timer steuert die Kaufphasen, es gibt keinen JavaScript-Loop pro Frame. Außerhalb
des sichtbaren Bereichs, bei inaktivem Tab und reduzierter Bewegung läuft keine
Automatik. Der manuelle Rechner funktioniert auch ohne IntersectionObserver oder
matchMedia; bei blockiertem Script bleibt ein statisches Beispiel mit gesperrten
Bedienelementen. Die bestehenden App-Aufnahmen darunter bleiben unverändert.

### Neue Katzen-Animation im Download-Bereich

Auf ausdrücklichen Nutzerwunsch ersetzt eine neue Manga-Katze die bisherige Figur
im Abschnitt „Bereit für deinen nächsten Band?“. 15 separat und nacheinander mit
dem eingebauten image_gen erzeugte Illustrationen bilden eine Stop-Motion-Schleife.
Die Originale, verwendeten Prompts und Prüfsummen liegen unter docs/cat-animation.
Die App-Screenshots und ihre Herkunftsbelege sind davon unabhängig und unverändert.

Die Website lädt einen 413.492 Byte großen WebP-Bildstreifen erst nahe dem Abschnitt.
15 CSS-Schritte bei acht Bildern pro Sekunde bewegen die Katze. Der anklickbare
Play-Link bleibt echtes HTML; Text und Symbole liegen vor der dekorativen Katze.
Ein statisches 28.836-Byte-Bild hält den Download auch ohne Script sichtbar.
Bei reduzierter Bewegung, inaktivem Tab oder unsichtbarem Abschnitt wird nicht
abgespielt. Manuelle Pause bleibt beim Scrollen erhalten. Es gibt keine Bildwechsel
per JavaScript und keine Canvas-/WebGL-/Videopipeline.

Die folgenden Abschnitte dokumentieren den ursprünglichen Reviewstand vom 12. Oktober.

## Gestaltung

Die Startseite verwendet die App-Farben #171217, #211A22, #D7A0AF,
#F7EEE8 und #C2B3B8. Große Typografie, echte App-Aufnahmen in CSS-Geräterahmen,
drei Kapitel für Entdecken/Sammeln/Planen und die originale App-Figur bilden
den Seitenaufbau. Alle Bildinhalte stammen aus der App; keine neu erzeugten
Illustrationen, erfundenen Oberflächen, Bewertungen oder Nutzerzahlen.

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

Auf Nutzerwunsch werden „Kostenlos · Werbefrei · Keine In-App-Käufe“ direkt
unter dem Hero-Download-Button hervorgehoben. Der Vertrauensbereich erläutert
die kostenlose Nutzung, den Verzicht auf Werbebanner/Werbevideos und In-App-Käufe
sowie „Wir verkaufen deine Daten nicht an Werbeanbieter“. Ein kleiner sichtbarer
Affiliate-Hinweis erklärt, dass die App Affiliate-Links verwendet und bei
qualifizierten Käufen eine Provision erhält. Die öffentliche
[App-Datenschutzerklärung](https://realityforge.eu/privacy-policy/manga-tracker/)
wurde hierfür am 12.10.2026 erneut per HTTP 200 geprüft: kein Verkauf persönlicher
Sammlungsdaten, keine Werbung Dritter, keine Banner-/Interstitial-Werbung und
externe Kauf-/Affiliate-Links sind dort dokumentiert. Der Android-Code bestätigt
den Datenschutztext, enthält keine Ads-/Billing-Abhängigkeiten und weist
Affiliate-Links mit Provision aus. Die Website behauptet keine generelle
Abwesenheit optionaler Analytics- oder Push-Dienste.

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
Die zusätzlichen Kostenlos-/Werbefrei-/In-App-Kauf-Hinweise und der
Affiliate-Hinweis wurden bei denselben sieben Breiten geprüft: kein Überlauf,
der Hero-CTA bleibt sichtbar. Nachweis:
[trust-responsive.json](review/trust-responsive.json).

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


## Designgespräch und mobiles Grundgerüst · 21.10.2026

### Festgehaltene Ideen aus dem Gespräch

Eric wünscht eine App-Website von Fans für Fans. Zusätzlich zur allgemeinen
Manga-Bildsprache will er konkrete Insider aus berühmten Reihen erkennen können.
Die folgenden Ideen bleiben als Entwurfsoptionen erhalten, nicht als freigegebene
Verwendung fremder Illustrationen oder Kennzeichen:

- Die Sammellücke: eigene Buchrücken 01, 02, Lücke, 04, 05; Band 03 schließt sie.
- Eine Startszene wie ein großes Manga-Panel: neutrales Android-Handy, echter
  App-Screenshot und davor/dahinter schwebende Bände wie eingefrorenes Herbstlaub.
- Die eigene Katze als wiederkehrende Figur mit kurzen Manga-Gefühlszeichen.
- Barcode-Scan, kurzer Bewegungslinien-Impuls und eigenes „ZACK!“, dann ins Regal.
- Monatsbudget sinkt, während sich gekaufte Bände zu einem Stapel sammeln.
- Sparsame Rasterpunkte, Tuschelinien und Fokuslinien innerhalb der vorgegebenen
  Rosé-/Pflaumenpalette; keine zusätzlichen Mini-Überschriften.

### Konkrete Reihenbezüge als Recherche, noch ohne Gestaltungsauswahl

„Jeder Manga-Fan kennt es“ wird nicht als Fakt behauptet. Bekanntheit unterscheidet
sich nach gelesenen Reihen; breite Erkennungszeichen und tiefere Insider trennen:

| Reihe | Erkennungszeichen / Insider | Offizieller Beleg |
| --- | --- | --- |
| One Piece | Strohhut als breites Zeichen; X am linken Arm beim Abschied von Vivi als emotionale Fanebene | https://one-piece.com/weareone/ |
| One Piece | Drei Schwerter und Orientierungslosigkeit: Zoros laufender Witz | https://one-piece.com/character/zoro/index.html |
| Naruto | Ichiraku-Ramen und das Handzeichen für Schattendoppelgänger | https://naruto-official.com/en/news/01_1623 |
| Dragon Ball | Vier-Sterne-Kugel als Erinnerung an Großvater Gohan; insgesamt sieben Kugeln für einen Wunsch | https://en.dragon-ball-official.com/news/01_3933.html |
| Dragon Ball | Überforderter bzw. explodierender Kampfkraft-Scouter | https://en.dragon-ball-official.com/news/01_1666.html |
| Death Note | Schwarzes Notizbuch und Ryuks Vorliebe für Äpfel | https://www.viz.com/blog/posts/death-note-all-in-one-edition |
| Attack on Titan | Kellerschlüssel als Story-Motiv | https://shingeki.tv/news/archives/2888 |
| Demon Slayer | Tanjiros grün-schwarz kariertes Haori als breites Erkennungszeichen | https://kimetsu.com/anime/risshihen/news/?id=59176 |

Diese Recherche ist keine Rechtefreigabe. Das Weglassen des Namens allein
entscheidet nicht über die Zulässigkeit einer konkreten Nachgestaltung; bei
Bearbeitungen gilt § 23 UrhG: https://www.gesetze-im-internet.de/urhg/__23.html
Serienobjekte, Logos oder Figuren wurden in diesem Schritt nicht ergänzt.

Allgemeine Bildsprache und Sammler-Motive:
https://www.clipstudio.net/en/comics-manga/tool/effects-tones/
https://www.britishmuseum.org/blog/introduction-manga
https://www.carlsen.de/reihe/one-piece?language=de

### Mobile Grundlage und offene Parallax-Frage

Für <=760 CSS-Pixel zeigt die Startseite nun ein einzelnes, selbst gestaltetes,
markenunabhängiges Android-Gehäuse mit dem unveränderten echten Screenshot
`releases.webp`. Sechs dekorative Bücher in unterschiedlichen Größen, Winkeln
und Vorder-/Hintergrundebenen verwenden dieselben echten Coverausschnitte aus
diesem Screenshot wie das Desktop-Portal. Keine erfundene App-Oberfläche und
kein neues Bild-Asset. Die vorhandene Desktop-Szene mit zwei Telefonen bleibt.

Mobil sind der lange Hero-Einleitungstext und die zusätzliche Abschnittsnavigation
im Header ausgeblendet; Überschrift, App-Bild, echter Play-Link und die drei
Kostenlos-/Werbefrei-/In-App-Kauf-Hinweise bilden den Einstieg. Alle weiteren
Inhalte stehen darunter weiterhin bereit.

Die Bücher sind zunächst eingefroren. Die Art der Parallax-Steuerung bleibt
entsprechend Erics Wunsch offen: Scrollen, Touch oder optional Bewegungssensoren.
In diesem Schritt werden keine Sensoren abgefragt. Die Ebenen sind so getrennt,
dass später nur Bildobjekte bewegt werden müssen; Text und Button bleiben fest.
Keine zusätzlichen Laufzeitabhängigkeiten, Dauertimer oder Render-Schleifen.

Sensor-Recherche aus dem vorherigen Gespräch: iOS Safari benötigt eine bewusste
Nutzeraktion und beim erstmaligen Freigeben einen Berechtigungsdialog; die
Entscheidung wird für die Browsersitzung gemerkt. Android/Chrome ist je nach
Version und Einstellungen häufig ohne Rückfrage möglich; ein langfristig
plattformübergreifend rückfragefreier Gyro-Effekt ist nicht verlässlich planbar.
https://bugs.webkit.org/show_bug.cgi?id=196992
https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/requestPermission_static
https://groups.google.com/a/chromium.org/g/blink-dev/c/ckd2rFmT3PA


Prüfung dieses Schritts: **75/75 Tests bestanden**. Lokaler Produktions-Bundlecheck
mit Wrangler `--dry-run` erfolgreich, keine Veröffentlichung. Die Originalbild-
Prüfsummen sind weiterhin unverändert. Im Browser wurden Viewports 320×740,
390×844, 430×932 und 760×900 sowie die normale Desktopansicht geprüft.
Der Browser reserviert dabei 15 px für die Scrollleiste; gemessene Inhaltsbreiten
sind 305, 375, 415, 745 und 1944 px, jeweils ohne horizontalen Überlauf.
Die 320er Ansicht wurde nach einer Abstandskorrektur erneut geprüft.
Der einzige mobile App-Screenshot ist vollständig geladen (720 px Originalbreite),
das hintere Telefon ist mobil ausgeblendet, die sechs Buchebenen sind dekorativ.
Am Desktop sind beide Telefone sichtbar und die mobilen Buchebenen ausgeblendet.
Die Website verwendet für die aktualisierte Startseite die Cachekennung landing-12.
Parallax wurde bewusst noch nicht als Interaktion umgesetzt.


## Mobile Landingpage mit Scroll-Parallax · 21.10.2026

Eric hat den weiteren Ausbau der mobilen Landingpage mit zentriertem Telefon,
echtem App-Screenshot, wenig Text und der zuvor besprochenen sensorfreien
Parallax-Bewegung beauftragt.

- Der mobile Einstieg trägt nun die kurze Überschrift „Deine Manga. Alles im
  Blick.“ und die Erklärung „Manga sammeln, Neuheiten entdecken und dein Budget
  planen.“ Die Desktop-Überschrift bleibt bei drei Zeilen.
- Das neutrale Android-Gehäuse steht horizontal und vertikal mittig in der Szene.
  Die alte automatische Randverteilung der überbreiten Figur ist entfernt.
- Im Telefon bleibt die belegte Originalaufnahme `releases.webp`, unverändert
  720×1433 px, vollständig geladen. Kein USB-Zugriff und kein Ersatzbild nötig.
- Scrollen bewegt vordere Bücher stärker als hintere. Das Telefon bewegt und
  neigt sich nur leicht; Text und Download-Button werden nicht transformiert.
- Ein passiver Scroll-Listener fasst Ereignisse in genau einem angeforderten
  Bild-Update zusammen. Keine dauerhafte Schleife, kein Bewegungssensor und keine
  zusätzliche Laufzeitbibliothek. Außerhalb der Szene, im Hintergrund, am Desktop
  und bei reduziertem Bewegungswunsch werden Listener/Updates gestoppt und die
  Ausgangskomposition wiederhergestellt.
- Der vorhandene Desktop-Portal-Controller ist zusätzlich auf >=761 px begrenzt.
- Für Mobilgeräte wurden sieben längere Fließtexte durch kompakte sichtbare
  Varianten ergänzt. Light Novels, Barcode, Mehrfach-Hinzufügen, Achievements,
  Kostenlos-/Werbefrei-/In-App-Kauf-Angaben sowie Datenschutz und Affiliate-
  Erklärung bleiben enthalten. Abschnittsabstände und Sammlungsfunktionen sind
  kompakter angeordnet.

Browserprüfung am tatsächlichen lokalen Worker unter 127.0.0.1:8787 mit aktiver
CSP: 320×740, 390×844 und 430×932. Kein horizontaler Überlauf. Die gemessene
Abweichung der projizierten Telefonmitte von der Viewportmitte liegt unter
0,4 CSS-Pixeln. Der Play-Button liegt jeweils unter dem Telefon und innerhalb
der geprüften Höhe. Bei 390 px steigt der Scroll-Fortschritt sichtbar von 0
auf 0,1873; bei der separaten Mobile-Vorschau bewegten sich Vorder- und
Hintergrund nach dem Scrollen um unterschiedliche Beträge. Browser-Konsole ohne
Fehler. Die normale Desktop-Ansicht wurde ebenfalls geprüft: zwei Telefone,
aktives Portal, keine mobilen Buchebenen und kein horizontaler Überlauf.

[Aktuelle Mobile-Aufnahme](review/mobile-landing-20261021.png).
Die interaktive lokale Mobile-Vorschau unter http://127.0.0.1:8788/ verwendet
unverändertes Landingpage-Markup und unterstützt 320, 390 und 430 px sowie
Scrollen in der Seite. Sie läuft über ein temporäres Hilfsskript, nicht als
Produktionsroute. Hauptvorschau weiterhin http://127.0.0.1:8787/.

Validierung: **83/83 Tests**, einschließlich acht neuer Tests für Ereignis-
Bündelung, aktuelle Geometrie, Sichtbarkeit, Breakpoints, Reduced Motion,
fehlende Browserfähigkeiten und Worker-Bundling. Startseiten-Cache landing-14.
