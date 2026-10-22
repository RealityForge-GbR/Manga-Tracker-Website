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
bleiben der eigene Hero und die native horizontale Kartengalerie erhalten.
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
