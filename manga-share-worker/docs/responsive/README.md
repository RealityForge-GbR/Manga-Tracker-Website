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
Barcode-Animation. Das Teilen steht mobil als vierte Featurekarte unter den drei bisherigen Funktionen.

Die vier Funktionen stehen als kompakte Karten mit Text links und vollständigem Motiv rechts untereinander.
Horizontaler Swipe ist auf Mobile nicht mehr nötig. Die originalen Screenshots
und das originale Collector-Arc-Artwork werden wiederverwendet. Dessen Start
an der Bildschirmmitte sowie der spätere, einmalige Schlossverschluss bleiben
erhalten. Community-Kasten, Katzenanimation und Desktop-/Tablet-Regeln wurden
nicht umgestaltet.

Die mobile Budget-Szene besitzt ein eigenes kompaktes Panel: oben eine
flache Budgetzeile, in der Mitte Paket und Bücher, unten eine gleich breite
Zeile für den Sammlungswert. Der ovale Paketschatten, die Wallet-Grafik und
der Fade sind dort ausgeblendet. Drei sichtbare Bücher wachsen auf fünf;
die vorhandenen Bücher bleiben am gemeinsamen Boden ausgerichtet und neue
Bände werden darüber abgelegt. Der dritte Band wird zweimal abgewiesen und
senkrecht zurückgelegt. Budget und Wertanzeige bleiben außerhalb der
Flugbahn. Der bestehende Controller führt weiterhin genau zwei Käufe aus
(20 → 10 → 0 €). Die CSS-Keyframes werden serverseitig erzeugt; es gibt
keinen neuen Animationsloop im Browser. Sichtbarkeitspausen, Tab-Pausen und
reduzierte Bewegung bleiben erhalten.

Geprüft: 320×568, 360×800, 375×667, 390×844, 430×932, 600×960, 740×360
sowie 768×1024, 820×1180, 1024×768, 1280×720 und 2560×1440. Kein
seitlicher Seitenüberlauf, keine horizontal versteckten Featurekarten.
Die gemessenen Desktop-Größen bei 1920×1080 sind unverändert. Auch Breite,
Höhe, Schrift und Abstände des Community-Kastens bei 390×844 stimmen überein.
Sechs Geometrieprüfungen decken alle 441 ganzzahligen Bildschirmbreiten
zwischen 320 und 760 Pixeln ab: Flugbahn einschließlich Rotation, korrekte
Landung beider Käufe, fester Boden vorhandener Bände, zwei Rückstöße,
senkrechte Rückgabe, geschützte Textbereiche und stetige Geschwindigkeit.

### Kompakte animierte Featurekarten

Die Karten verwenden auf Mobile normalen Gridfluss statt absolut positionierter,
am unteren Rand abgeschnittener Handys. Ihre Höhe wächst mit dem Text.
Bei 390 Pixeln Bildschirmbreite liegen die vier Höhen bei rund 240, 271, 240
und 250 Pixeln, statt zuvor 490 Pixeln pro Karte. Bei 320 Pixeln sind sie
230–242 Pixel hoch. Handys, Achievement-Artwork und Beschriftungen passen
vollständig hinein; bei 320, 360, 390, 430, 600 und 760 Pixeln wurden alle
Motivgrenzen und Textbreiten im Browser geprüft.

Die zwei echten App-Mockups schweben mit ±3 Pixeln Bewegung und sanfter
Drehung. Collector Arc behält seine originale Sakura-Freischaltung samt
Start an der Bildschirmmitte. Die neue vierte Karte zeigt schematisch einen
Manga, der über einen Link zwischen zwei Handys geteilt wird; die Grafik
gibt keinen erfundenen App-Screenshot aus. Der separate Teilen-Text beim
Budget bleibt auf Desktop sichtbar und wird nur mobil in die Karte verlagert.

Ein gemeinsamer IntersectionObserver pausiert die neue Kartenbewegung außerhalb
des Bildschirms, in versteckten Tabs und bei reduzierter Bewegung. Kein
Browser-Frame-Loop und keine neue Bibliothek. Acht Verhaltenstests prüfen
unter anderem Bildladefehler, Präferenz- und Breakpointwechsel, Teilbatches
der Sichtbarkeitsmeldungen, die vierte Karte und den minifizierten Controller.
Die gemessene Desktopgeometrie bleibt innerhalb von 0,001 Pixeln gleich;
die vierte Karte ist dort ausgeblendet und die neue Bewegung inaktiv.

### Vergleich nach dem mobilen Budget-Neuaufbau

Bei 390×844 ist das Panel rund 427 Pixel hoch. Auf 320 bis 760 Pixeln
entsteht kein seitlicher Überlauf und beide Wertzeilen passen vollständig.
PC bei 1920×1080 und Tablet bei 820×1180 wurden vor und nach der Änderung
verglichen: identische Größen, Positionen, Typografie und Transformationen.
Alle 159 Tests und der Produktions-Dry-Run sind erfolgreich.
