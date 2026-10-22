# Manga-Katze am Google-Play-Button

15 nacheinander mit dem eingebauten image_gen-Tool erzeugte Katzenbilder.
Alle weiteren Bilder verwenden Bild 01 als feste visuelle Referenz. Es handelt
sich um eine ausdrücklich gewünschte Website-Illustration, keinen App-Screenshot.

Die 15 unveränderten Original-PNGs liegen in [frames](frames). Jedes Bild hat
1254 × 1254 Pixel mit Transparenz. [Kontaktbogen](contact-sheet.jpg), zeilenweise
von Bild 01 bis 15. [Alle verwendeten Prompts](prompts.json) und [Prüfsummen](manifest.json).
Die Prompts enthalten gewünschte Koordinaten; die tatsächlich gelieferten Originale
haben durchgehend dieselbe 1254er Zeichenfläche.

Für die Website werden alle Bilder gleichmäßig auf 512 × 512 Pixel verkleinert
und nebeneinander gepackt. Der Inhalt wurde dabei nicht neu gezeichnet oder ersetzt.

- `public/landing/manga-cat-sprite.webp`: 7680 × 512 Pixel, 413.492 Byte.
- `public/landing/manga-cat-still.webp`: statisches Ersatzbild, 512 × 512 Pixel,
  28.836 Byte.
- 15 feste Schritte in 1,875 Sekunden entsprechen acht Bildern pro Sekunde.
- Der echte HTML-Link bleibt unabhängig anklickbar; Pfoten überlagern nur die
  dekorative Buttonfläche. Text und Symbole bleiben lesbar.
- Der Bildstreifen wird erst nahe dem Abschnitt geladen. Außerhalb des sichtbaren
  Bereichs, bei inaktivem Tab und reduzierter Bewegung bleibt er still.
- Die kleinere Katze und der Download-Link stehen auf einem CSS-Manga-Regal. Der
  Bücherstapel trägt den Button; ein separates Pausenelement wird nicht angezeigt.
- Keine Überblendungen, kein Video/Canvas/WebGL und kein JavaScript pro Bildwechsel.

Vorbild ist die frühere RealityForge-Bildstreifen-Technik aus
`/Users/ericosterwald/Documents/Codex/2026-10-13/manga-tracker-regal-ordnen/outputs/Kaminanimation.txt`.
Dort liefen acht Kaminbilder als CSS-Sprite. Die frühere Sechs-Bilder-Katze hatte
unruhige Konturen und wurde historisch durch eine einzelne Zeichnung ersetzt.
Dieser neue, ausdrücklich beauftragte Ansatz verwendet 15 neue Bilder,
eine feste Referenz und harte Bildwechsel.

Technische Referenzen: [CSS steps()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/steps),
[animation-play-state](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-play-state).
