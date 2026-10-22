# Regal-Scroll-Prototyp

Die Regalzeichnung ist eine ausdrücklich gewünschte Illustration, kein App-Screenshot.
Sie wurde mit dem eingebauten Imagegen-Tool erstellt. Original und vollständiger Prompt
liegen in diesem Ordner. Das WebP behält die Originalabmessungen; nur das Format wurde
für die Website komprimiert. Dasselbe Asset bildet die ganze Regalstrecke.

Neun Sprechblasen ersetzen probeweise die bisherigen Entdecken-/Sammlungsabschnitte.
Budget, Datenschutz und der bereits überarbeitete Community-Downloadkasten bleiben separat.
Neuerscheinungen und Reihen ergänzen erhalten ankommende Bücher; andere Etagen ziehen
Bände hervor. Der Beispielwert der Sammlung steigt beim Scrollen von 85 auf 153 Euro.
Die Beispielrechnung zeigt keine echten Nutzerdaten und keinen geschätzten Marktwert.

Die Bewegung reagiert auf Scrollen, benötigt keinen dauerhaften Render-Loop und hält
außerhalb des Abschnitts sowie bei inaktivem Tab an. Reduzierte Bewegung und fehlende
Browserfähigkeiten behalten eine lesbare statische Darstellung. Mobile stapelt Regal
und Sprechblase untereinander. Native Details-Elemente zeigen unveränderte Original-
Screenshots; die Beispielband-Links führen zu einer vorhandenen echten Manga-Seite.

Reihen folgen wurde vom Nutzer als Funktion vorgegeben; der aktuelle Repository-Nachweis
belegt Reihenübersicht, Bandstatus und Mehrfachimport, aber keinen separaten Follow-Schalter.
Personalisierte Empfehlungen sind nicht zugesagt. Neue App-Aufnahmen für Barcode,
Achievements und Sammlungswert fehlen; dort stehen nur die angefragten Illustrationen.


## Scan-and-shelve vignette

The barcode section now shows three illustrated volumes being scanned individually,
then turning upright and settling on a shelf. These are native SVG book shapes in
the app palette, not a reproduction of the app interface or a batch-scanning claim.
The existing feature copy describes adding one manga by barcode.

A shared 12-second CSS sequence animates only transforms and opacity. The scene
pauses below 20% visibility and when the tab is hidden, preserving its current phase.
Reduced-motion preferences and unavailable browser capabilities show the completed
static shelf. No image sequence, video, external library, sensor access, or
JavaScript frame loop is needed. There is no manual pause control.


## Teilen-Szene

Die neunte Etage zeigt zwei neutrale Android-Geräte mit derselben unveränderten
Originalaufnahme `library.webp`. Ein dekoratives Exemplar des ersten Covers
(Jujutsu Kaisen, Band 1) hebt sich aus der linken Aufnahme, fliegt als kleines
räumliches Buch über eine gebogene Verbindung und landet auf der rechten Aufnahme.
Das Original bleibt auf dem sendenden Gerät sichtbar. Coverausschnitt im SVG:
x=67, y=575, Breite=138, Höhe=205 innerhalb des unveränderten 720×1433-Screenshots.
Es gibt keinen generierten App-Bildschirm und keine erfundene Teilen-Oberfläche.
Eine eigene App-Aufnahme des Teilen- oder Empfangsablaufs liegt noch nicht vor.

Die Szene erläutert das Weiterempfehlen eines Manga-Links. Der Repository-Nachweis
belegt die öffentlichen ISBN-Seiten mit Cover, Details und Social-Vorschau; er
belegt keinen automatischen Bibliotheksimport oder Austausch von Sammlungsdaten.
Der Begleittext verspricht deshalb nur den Link zu Cover und Details.

Die CSS-Schleife dauert 9,6 Sekunden und animiert ausschließlich Transformationen
und Transparenz. Sichtbarkeit ab 20 Prozent, Tab-Aktivität und Bewegungspräferenz
steuern die Wiedergabe. Außerhalb des Bildes bleibt die Phase erhalten; reduzierte
Bewegung oder fehlende Browserfunktionen ergeben eine statische Illustration.
Keine Sensorfreigabe, neue Bibliothek, Videodatei oder JavaScript-Bildschleife.


## Budget-Kreislauf

Der bisherige interaktive Rechner wurde durch ein automatisches Beispiel ersetzt.
Oben steht „Lege dein Monatsbudget fest …“, darunter „… und erfasse den Wert deiner
Sammlung.“ Die Zeichnung zeigt einen kleinen Shop, das Budget als Durchgang und
einen waagerecht gestapelten Bücherstapel. Eine vorhandene Sammlung aus drei
Bänden / 30 Euro wächst durch zwei Beispielkäufe zu je 10 Euro auf fünf Bände /
50 Euro. Das Monatsbudget sinkt von 20 über 10 auf 0 Euro. Der dritte Band wird
kurz vor dem Budget angehalten und zurückgewiesen; eine kurze rote Markierung
zeigt die Sperre an. Die Schleife setzt nur die Beispielzeichnung zurück.

Desktop ordnet Shop, Budget und Stapel nebeneinander an, Mobile als Dreieck.
Die ursprünglichen App-Aufnahmen unterhalb bleiben unverändert. Die Zeichnung
enthält keine erfundene App-Oberfläche, Eingabefelder oder Schaltflächen.

CSS bewegt Bücher und Markierungen mit Transformationen und Transparenz; ein
einzelner JavaScript-Timer schaltet die wenigen Etappen der zwölfsekündigen
Schleife. Das Budget wird beim Durchgang abgebucht, der Sammlungswert bei der
Ankunft erhöht. Außerhalb des Sichtbereichs oder bei verborgenem Tab pausieren
Zeit und Bewegung gemeinsam. Reduzierte Bewegung oder fehlende Browserfunktionen
zeigen eine fertige statische Szene mit ausgeschöpftem Budget.


## Schloss und Finanzierung

Der Datenschutz-Abschnitt zeigt ein großes, nativ gezeichnetes Schloss links neben
„Deine Manga. Deine Daten.“. Die Illustration ist zunächst eierschalenweiß. Der
Bügel schließt mit einem kurzen Nachfedern; beim Einrasten wechselt das Schloss
zu Rosé. Die sechssekündige CSS-Schleife nutzt Transformationen und Transparenz,
keine neue Bildfolge. Außerhalb des sichtbaren Bereichs und im inaktiven Tab
pausiert sie ohne Phasenverlust. Reduzierte Bewegung oder fehlende Fähigkeiten
zeigen ein geschlossenes roséfarbenes Schloss.

Die bisherigen sechs Textkacheln entfallen. Ein kurzer Absatz beschreibt lokal
gespeicherte Sammlung, Einkaufsliste und Budget ohne benötigtes Benutzerkonto.
Der Affiliate-Hinweis steht in derselben Schriftgröße unter dem Schlossbereich,
mit einem gezeichneten Pixelherz und „So finanzieren wir uns.“. Er nennt freiwillige
Affiliate-Links, qualifizierte Käufe, Provision und keine Mehrkosten.

Die Downloadüberschrift lautet „Tritt der Community kostenlos bei!“, wobei nur
„kostenlos“ rosé hervorgehoben ist. Auf schmalen Bildschirmen darf diese längere
Überschrift zugunsten lesbarer Schrift zweizeilig stehen.
