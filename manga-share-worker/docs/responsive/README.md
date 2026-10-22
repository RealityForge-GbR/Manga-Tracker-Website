# Gemeinsames Desktop-/Tablet-Raster

Ab 761 Pixeln verwenden Kopfzeile, Hero-Inhalt, Budgetanimation, Budgetdetails,
Featurekarten, Datenschutz, Downloadkasten und Fußzeile dieselbe Inhaltsbreite:
`min(1560px, calc(100% - clamp(64px, 10vw, 240px)))`.
Die farbige Budgetfläche und der Bücherabtrenner bleiben randfüllend.

Das Raster nutzt die bisherige Breite des Budgetdetailblocks und beseitigt den
Versatz zu den vormals auf 1280 Pixel begrenzten Abschnitten. Es gibt keinen
Breitensprung mehr zwischen 1100 und 1101 Pixeln. Textzeilen und Mockups behalten
eigene Größenobergrenzen, damit sie auf großen Monitoren lesbar bleiben.

Auf Tablets stehen die drei Featurekarten nebeneinander; Schrift, Innenabstände,
Mockups und die grafischen Budgetelemente passen sich an. Die Budgetdetails
bleiben bis 1100 Pixeln zweispaltig mit Barcode darunter. Mobil bis 760 Pixeln
nutzen der eigene Hero und die Featurekarten den unten beschriebenen mobilen Aufbau.
Auch der eigene Hero-Modus für kleine Querformat-Displays bleibt bestehen.

Die Anpassung betrifft Layout und Größen. Animationsabläufe, Originalbilder,
Bewegungspräferenzen und Pausen außerhalb des sichtbaren Bereichs bleiben erhalten.

## Prüfung am 22.10.2026

Im Browser wurden 13 Viewports geprüft: 2560×1440, 2079×1158, 1920×1080,
1440×900, 1280×800, 1101×800, 1100×800, 1024×768, 820×1180, 768×1024,
761×900, 390×844 und 1024×480. Kein seitlicher Seitenüberlauf; gemeinsame
Außenkanten der Inhaltsabschnitte; keine Überschneidung von Kartentexten und
Mockups. Der Einstieg füllt die Viewporthöhe (Rundungstoleranz 0,05 Pixel).
Der Übergang 1100/1101 wurde gesondert geprüft. Visuelle Kontrollen umfassen
Hero, Budgetgrafik und Erklärungen, Featurekarten sowie Datenschutz und Download.
143 bestehende Tests und der Produktions-Dry-Run sind erfolgreich.

## Nachprüfung der weitergeleiteten Kundenansicht

Das gemeinsame Seitenraster war bereits live. Im Hero blieb auf großen Monitoren
jedoch ein großer Abstand zwischen dem auf 380 Pixel begrenzten Text und den
Telefonen. Ab 1101 Pixeln nutzt der Text nun eine ausgewogen umbrochene Breite
von 380–640 Pixeln und eine Schriftgröße von 32–64 Pixeln. Die Größe reagiert
auf Breite und Höhe des Bildschirms. CTA, Buttontext, Symbol und Kurzvorteile
wachsen gemeinsam mit. Das Geräte-Duo steht näher am Text; seine bisherigen
Größenobergrenzen bleiben bestehen. Auf Tablets erhalten Titel und CTA eine
kleine Lesbarkeitsanpassung. Die eigene Mobilansicht bleibt unverändert.

Die acht App-Screenshots sind weiterhin die echten, dokumentierten WebPs mit
720×1433 Pixeln. Die Originalaufnahmen mit 1080×2400 Pixeln sind hier nicht
vorhanden. Die zugeschickte WhatsApp-/Fotoansicht ist kein unverkleinerter
Schärfebeleg. Für höhere Pixeldichten sollten die echten Original-PNGs erneut
verlustarm als größere Variante eingebunden werden. Es wurde kein Screenshot
hochgerechnet, nachgezeichnet oder als neue Aufnahme ausgegeben.

### Verhältnis der linken Hero-Inhalte

Nach der Kundenpräzisierung skaliert die ganze linke Inhaltsgruppe gemeinsam:
Titel, Downloadbeschriftung, Icon, Buttonfläche und drei Häkchenzeilen. Breite
und Höhe begrenzen die Skalierung, damit hohe Desktop-Viewports stärker
ausgenutzt werden, ohne auf niedrigen Laptop-Bildschirmen Text abzuschneiden.
Die Linksbündigkeit zur Kopfzeile und die Viewporthöhe bleiben erhalten.
Die Handys werden für diese Anpassung nicht vergrößert.

Geprüft auf 16 Viewports von 390×844 bis 3440×1440, darunter 1920×800,
1600×1200 und 1280×634 für verschiedene Seitenverhältnisse. Titel, CTA und
Häkchen passen ohne Überlauf in den Einstieg; die gemeinsame linke Außenkante
bleibt bestehen. 145 Tests und Produktions-Dry-Run erfolgreich.

Auf weiteren Nutzerwunsch ist die linke Gruppe auf großen Desktops nochmals
deutlich größer: im 1920×1080-Beispiel knapp 64 Pixel Titelgröße, etwa
106 Pixel Buttonhöhe und knapp 22 Pixel für die Häkchenzeilen. Die tatsächliche
Spaltenbreite begrenzt die Überschrift zusätzlich über einen Inline-Container.
Niedrige Laptopansichten behalten eine kompakte, vollständig sichtbare Gruppe.

## Eigener mobiler Aufbau (22.10.2026)

Bis einschließlich 760 Pixeln zentriert `landing-mobile-layout-styles.js` den
Einstieg, die Erklärungstexte und den Datenschutzabschnitt. Der Hero bleibt
exakt einen sichtbaren Bildschirm hoch. Der Budgettext steht vor dem kleineren
Android-Mockup; die Sammlungserklärung steht vor der auf 330 Pixel begrenzten
Barcode-Animation. Das Teilen wird als eigener kurzer Textblock gezeigt.

Die drei Funktionen stehen als 480–490 Pixel hohe Karten untereinander.
Horizontaler Swipe ist auf Mobile nicht mehr nötig. Die originalen Screenshots
und das originale Collector-Arc-Artwork werden wiederverwendet. Dessen Start
an der Bildschirmmitte sowie der spätere, einmalige Schlossverschluss bleiben
erhalten. Community-Kasten, Katzenanimation und Desktop-/Tablet-Regeln wurden
nicht umgestaltet.

Die mobile Budget-Szene besitzt eine eigene Geometrie: Wallet oben mittig,
Paket links darunter, Sammlung rechts darunter. Ein Buch steigt senkrecht
aus dem Paket und fliegt auf einer gebogenen Bahn hinter der Wallet zur
Sammlung. Der dritte Band wird zweimal abgewiesen und senkrecht zurückgelegt.
Budget, Wertanzeige und Abbuchung liegen außerhalb der sichtbaren Flugbahn.
Der bestehende Controller führt weiterhin genau zwei Käufe aus (20 → 10 → 0 €).
Die zusätzlichen CSS-Keyframes werden serverseitig erzeugt; es gibt keinen
neuen Animationsloop im Browser. Sichtbarkeitspausen, Tab-Pausen und reduzierte
Bewegung bleiben erhalten.

Geprüft: 320×568, 360×800, 375×667, 390×844, 430×932, 600×960, 740×360
sowie 768×1024, 820×1180, 1024×768, 1280×720 und 2560×1440. Kein
seitlicher Seitenüberlauf, keine horizontal versteckten Featurekarten.
Die gemessenen Desktop-Größen bei 1920×1080 sind unverändert. Auch Breite,
Höhe, Schrift und Abstände des Community-Kastens bei 390×844 stimmen überein.
16 neue Geometrieprüfungen decken Flugbahn, Debit-Milestone, zwei Rückstöße,
senkrechte Rückgabe, geschützte Wertanzeige und stetige Geschwindigkeit ab.
