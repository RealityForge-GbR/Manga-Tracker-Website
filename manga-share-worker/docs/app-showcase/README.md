# Zusätzlicher Produktentwurf

Am 22.10.2026 auf ausdrücklichen Nutzerwunsch als zusätzlicher Abschnitt unter
dem vorhandenen Community-Downloadkasten und vor dem Footer ergänzt. Kein
vorhandener Abschnitt wurde ersetzt. Anker: `#app-ansichten`.

## Inspiration

- [Apple Books](https://www.apple.com/de/apple-books/): kurze, große Überschriften,
  großzügige Abstände, gruppierte Originalansichten und abgerundete Funktionskarten.
  Die offizielle Seite wurde per Websuche und im Browser visuell geprüft.
- [Apple Music](https://www.apple.com/de/apple-music/): Produktfunktionen mit
  passenden großen App-Ansichten; offizielle Seite über Websuche geprüft.
- [Things](https://culturedcode.com/things/): zusammengehörige App-Ansichten
  in einer Produktcollage und vom Download getrennter Funktionsbereich.
- [Todoist Features](https://www.todoist.com/features): je Thema zugehörige
  UI-Ansichten; vom Recherche-Agenten auf der offiziellen Seite geprüft.

Die Übertragung auf drei dunkle Karten mit Rosé-Akzenten ist ein eigener Entwurf
für Manga Tracker. Keine fremden Grafiken, Texte, Logos, Zahlen oder Bewertungen
werden eingebunden.

## Umsetzung

Drei Karten zeigen ausschließlich die bereits dokumentierten, unveränderten
Originalaufnahmen `library.webp`, `releases.webp` und `detail.webp`. Die neutralen
Android-Rahmen sind CSS. Es wurde kein App-Bildschirm generiert oder neu erstellt.
Die Herkunft und Prüfsummen bleiben im bestehenden Screenshot-Manifest.

Auf großen Bildschirmen stehen die drei Karten nebeneinander. Mobile und Tablet
nutzen eine native, mit Tastatur und Touch scrollbar angelegte Galerie mit
CSS-Scroll-Snap. Die nächste Karte bleibt angeschnitten sichtbar. Der Entwurf
lädt keine zusätzlichen Assets, Skripte oder Schriftarten und hat keine
fortlaufende Animation. Die Bilder laden unterhalb des sichtbaren Bereichs lazy.
