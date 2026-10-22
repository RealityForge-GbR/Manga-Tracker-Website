# Featurekarten

Die drei Karten stehen in der vom Nutzer festgelegten Reihenfolge:

1. **Neuerscheinungen verfolgen** – unverändertes Original `releases.webp`.
2. **Achievements bekommen** – originales P04-Artwork `collection-mascot.webp`
   mit der aus dem Android-Code übertragenen Sakura-Freischaltbewegung.
3. **Reihen folgen** – unveränderte Originalaufnahme `series.webp` (Meine Reihen).

Die beiden Android-Rahmen sind CSS. Kein App-Bildschirm wurde erfunden oder neu
gezeichnet. Für die konkrete Follow-Bedienoberfläche liegt noch kein Screenshot
vor; die dritte Karte zeigt daher transparent die bereits vorhandene echte
Reihenübersicht. Der Text verspricht keinen neuen Schalter und keine ausgedachten
Benachrichtigungen. Die vorher verwendeten Bilder bleiben an anderen Stellen
bzw. als Originaldateien erhalten.

## Achievement: Original statt Ersatzgrafik

Die vorhandene Datei ist `achievement_p04.webp` aus der Android-App, unverändert
und bereits über SHA-256 dokumentiert:
`5a8c5374f9a7509e7dec08c7af298f432fe42c2cc5f3ff0c7b7431965386ddd7`.
Name und Zuordnung **P04 / Collector Arc** stammen aus `AchievementCatalog.kt`
und `AchievementArtwork.kt`; P04 nutzt laut `AchievementVisualSpec.kt` und
`AchievementRewardMetadata.kt` den normalen Sakura-Effekt.

Am 22.10.2026 direkt aus `RealityForge-GbR/Manga-Tracker-Android` gelesen:

- [AchievementRewardOverlay.kt](https://github.com/RealityForge-GbR/Manga-Tracker-Android/blob/main/app/src/main/java/eu/realityforge/mangatracker/ui/achievement/AchievementRewardOverlay.kt), Blob `adcb0c0fd3fd33a2dc1aaa2bb26f78d830d5647e`.
- [RewardParticles.kt](https://github.com/RealityForge-GbR/Manga-Tracker-Android/blob/main/app/src/main/java/eu/realityforge/mangatracker/ui/achievement/RewardParticles.kt), Blob `06f022e8f3c8b113fbf7d359cc0555d7effd611f`.
- [SakuraPetalParticles.kt](https://github.com/RealityForge-GbR/Manga-Tracker-Android/blob/main/app/src/main/java/eu/realityforge/mangatracker/ui/achievement/SakuraPetalParticles.kt), Blob `9e1a6d027c61f6939d9c701e0f9bd695da679ddc`.
- `AchievementVisualSpec.kt`, Blob `9ceb47902b646213c0824096d0d67969bc6ec3c7`.
- `AchievementCatalog.kt`, Blob `f2a11897b50d8196140fce38243ecc1376973e3b`.

Übernommen sind 220 Millisekunden Einblenden, 24 Pixel Anheben über 350
Millisekunden und die gedämpfte Feder `1 − .18 * exp(−7t) * cos(15t)` für das
Artwork. Keine Rotation des Artworks. Die originale Blütenblatt-Form, zwei
Tiefenebenen mit 16/26 Blättern, 2,2–3,2 Sekunden Fallzeit sowie vier Glanzpunkte
mit den App-Positionen und Startzeiten sind im Web als CSS/SVG umgesetzt.
Die native App blendet nach 3,1 Sekunden aus; die Website hält das fertige
Achievement zwischen den Wiederholungen sichtbar. Ein Durchlauf dauert hier
7,6 Sekunden und hat keinen Ton. Dies ist eine Website-Adaption des echten
App-Effekts, kein aufgenommener oder erfundener Achievement-Screenshot.

CSS übernimmt die Bewegung ohne JavaScript pro Bild. Wiedergabe beginnt erst
nach Laden des Original-Artworks und ab 20 Prozent Sichtbarkeit; sie pausiert
außerhalb des Bildes und im verborgenen Tab. Reduzierte Bewegung bzw. fehlende
Browserfunktionen behalten das statische Artwork. Tests prüfen Federverlauf,
Bildladezustände, Pause/Fortsetzung, Präferenzen und Produktions-Minifizierung.

Auf Desktop und Tablet stehen drei Karten nebeneinander. Auf dem Handy bleibt
die native Touch-/Tastatur-Galerie mit CSS Scroll Snap. Es gibt keine
neuen Bilddateien, Fremd-Bibliotheken oder Netzwerkquellen zur Laufzeit.


## Entfernte Benachrichtigungsvorschau

Die separate, aufklappbare Entwicklungsvorschau unter diesen drei Karten wurde
am 22.10.2026 auf Nutzerwunsch entfernt.
Die originale Screenshotdatei und ihr Herkunftsnachweis bleiben unverändert.
Die erste Karte trägt jetzt `id="entdecken"` als Ziel des bestehenden Menülinks.

## Position und Textausrichtung

Die drei Karten stehen direkt nach dem Budget-/Sammlungsblock und vor dem
waagerechten Bücherabtrenner. Die bisherige sichtbare Abschnittsüberschrift
entfällt; ein zugänglicher Abschnittsname bleibt erhalten. Titel und Kurztexte
sind auf Desktop, Tablet und Handy horizontal zentriert. Die bestehende
mobile Touch-Galerie und die Achievement-Animation bleiben unverändert.
Ab 761 Pixeln teilen sich die Karten die Außenkanten des Budgetblocks und
passen Abstände, Schriftgrößen und Mockups an ihre verfügbare Breite an.
