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


## Budget-Stapel

Der Budget-Abschnitt ist ein farblich abgesetztes Band in Sekundärhintergrund
(#342735), etwa 416 Pixel hoch am Desktop und 385 Pixel auf dem Handy. Ein
separater Hintergrund wird um -1,4 Grad geschert: Beide Kanten steigen dezent
nach rechts, während Text und Illustrationen aufrecht bleiben. Paket,
Monatsbudget und Sammlungswert stehen von links nach rechts. Die echten
App-Aufnahmen folgen separat.

Die Stapelidee orientiert sich an „Stack“ (Ketchapp,
https://play.google.com/store/apps/details?id=com.ketchapp.stack), mit eigenen
nativ gezeichneten Büchern. Die Buchbreite ist am Desktop 190 Pixel. Es werden
keine Spielgrafiken oder erfundenen App-Screenshots verwendet.

Das Paket öffnet und schließt seine vier Klappen mit 24 festen Vektor-Bildern.
Zwei übereinanderliegende SVG-Bildstreifen halten Vorder- und Rückseite getrennt;
die CSS-Technik entspricht der Katze, benötigt aber keine neue Rastergrafik.
Geschlossene Klappen bedecken die Öffnung tatsächlich. Die vorderen Klappen
öffnen zuerst, beim Schließen sind die hinteren zuerst an der Reihe.
Jedes Buch bleibt zuerst mittig über der
Öffnung, wird senkrecht angehoben und wächst erst oberhalb der Klappen auf seine
volle Größe. Die Höhe wird aus Paketposition, Paket- und Buchgröße berechnet.
Erst danach beginnt die seitliche Bewegung. Beim Rückflug läuft dieselbe
Bewegung umgekehrt: zunächst über die Öffnung, dann senkrecht hinein. Die
Paketvorderseite verdeckt dabei das Buch. So bewegt es sich nicht durch eine
Seitenwand. Der weiße Paketaufkleber und beide Routenpfeile entfallen.

Eine dunkle Wallet-Karte zeigt den Betrag und zwei roséfarbene Markierungen,
die sich bei den Käufen einzeln abdunkeln. Das Beispiel beginnt mit 20 Euro
Monatsbudget und acht vorhandenen Bänden im Wert von 80 Euro. Genau zwei Käufe
zu je 10 Euro lassen den Wert auf 100 Euro / zehn Bände steigen. Am Budget wird
abgebucht, erst bei Ankunft wird der Sammlungswert erhöht.

Der erfolgreiche Flug dauert 2,2 Sekunden; die Abbuchung erfolgt bei 60 Prozent.
Bei null Euro versucht das nächste Buch zweimal, die Budgetgrenze zu passieren.
Es federt dazwischen zurück, löst zwei kurze Fehlermarkierungen aus und kehrt
anschließend vollständig ins Paket zurück. Dieser Ablauf dauert 3,8 Sekunden.
Danach schließen sich die Klappen in 0,75 Sekunden. Budget und Sammlung bleiben
dabei unverändert und anschließend stehen. Es gibt
keinen Verkauf, Erlös oder unbemerkten Budget-Neustart.

Die sichtbaren Beschriftungen „Shop“, „10 € pro Band“, „Budget aufgebraucht“ und
die Bandanzahl bleiben entfernt. Monatsbudget und „Wert deiner Sammlung“ sind beschriftet.

Der gesamte Ablauf dauert 10,19 Sekunden und benötigt nur einen Milestone-Timer.
CSS animiert Transformationen und Transparenz. Zehn vorbereitete Buchlagen bilden
den gezählten Bestand. Sechs unnummerierte, rein dekorative Lagen verlängern den
Stapel darunter bis zum unteren Rand des Bandes. Ein mehrstufiger Verlauf blendet
ihn über eine lange Strecke aus und verbirgt sein Ende. Die Ergänzungen beeinflussen
weder Käufe noch Budget oder angezeigten Wert. Die Bühne ist am Desktop auf
320 Pixel, mobil auf 284 Pixel reduziert; Paket und Budget stehen weiter oben.
Der feste Bildbereich läuft 28 Pixel (mobil 48 Pixel) unter dem Bühnenende weiter.
Das Schlosssymbol am Monatsbudget entfällt; der kleine Verschluss bleibt ohne Schloss. Der Anflug bleibt unter der Wertbeschriftung
(20 Pixel Anhebung am Desktop, 40 Pixel mobil). Auch der kurze Abzug von
10 Euro erscheint außerhalb des Flugwegs oberhalb der Budgetkarte.
Außerhalb des Sichtbereichs oder bei verborgenem Tab pausieren Zeit und Bewegung
gemeinsam. Reduzierte Bewegung oder fehlende Browserfunktionen zeigen das
fertige Beispiel mit ausgeschöpftem Budget und geschlossenem Paket ohne Timer.


## Schloss und Finanzierung

Der Datenschutz-Abschnitt zeigt ein großes, nativ gezeichnetes Schloss links neben
„Deine Manga. Deine Daten.“. Die Illustration ist zunächst eierschalenweiß. Der
Bügel schließt mit einem kurzen Nachfedern; beim Einrasten wechselt das Schloss
zu Rosé. Die einmalige CSS-Animation beginnt bereits 100 Pixel vor dem unteren
Bildschirmrand; der Bügel rastet nach rund 1,5 Sekunden ein und bleibt geschlossen.
Nach 4,8 Sekunden ist die Animation beendet. Erneutes Scrollen oder ein Tabwechsel
öffnen das Schloss nicht wieder. Die Bewegung nutzt Transformationen und
Transparenz, keine neue Bildfolge. Vor Abschluss pausiert sie außerhalb dieses
Bereichs und im inaktiven Tab ohne Phasenverlust. Reduzierte Bewegung oder
fehlende Fähigkeiten zeigen ein geschlossenes roséfarbenes Schloss.

Die bisherigen sechs Textkacheln entfallen. Ein kurzer Absatz beschreibt lokal
gespeicherte Sammlung, Einkaufsliste und Budget ohne benötigtes Benutzerkonto.
Der Affiliate-Hinweis steht in derselben Schriftgröße unter dem Schlossbereich,
mit einem gezeichneten Pixelherz und „So finanzieren wir uns.“ in eigener Zeile.
Er nennt freiwillige
Affiliate-Links, qualifizierte Käufe, Provision und keine Mehrkosten.

Die Downloadüberschrift lautet „Tritt der Community kostenlos bei!“, wobei nur
„kostenlos“ rosé hervorgehoben ist. Auf schmalen Bildschirmen darf diese längere
Überschrift zugunsten lesbarer Schrift zweizeilig stehen.


## Hero und Budget-Details

Die Desktop-Telefone reagieren auf Mausbewegung im gesamten Hero-Abschnitt.
Scrollen dreht sie leicht gegenläufig um die Z-Achse und versetzt die vier
Hintergrundbücher. Beide Ereignisse teilen einen angeforderten Render-Frame;
außerhalb des Sichtbereichs, im verborgenen Tab und bei reduzierter Bewegung
sind die Listener entfernt. Das linke Gerät trägt ein matteres Bordeaux-Gehäuse
mit Hörmuschel, das rechte einen helleren Rahmen mit Kameraöffnung. Die beiden
Original-Screenshots bleiben unverändert. Headline, Download und Häkchen stehen
auf derselben linken Kante wie die Kopfmarke, auch mobil mit sicheren Seitenabständen.

Unter dem Budget-Beispiel steht links ein perspektivisches Android-Mockup mit
dem originalen Budget-Screenshot. Rechts erläutern zwei gleich formatierte
Textblöcke die Monatsplanung und den Wert der Sammlung. Die alte Bildunterschrift
entfällt. Der Benachrichtigungs-Screenshot bleibt nach der App-Galerie in einer
aufklappbaren Entwicklungsvorschau erhalten, einschließlich des Hinweises auf
simulierte Beispielmeldungen, Status und Termine.

## Durchgehendes Regal

Ein dekoratives Bücherregal ersetzt die obere Trennlinie des Datenschutzbereichs
und reicht über die gesamte Bildschirmbreite. Achtzig originale, generische
Buchrücken verteilen sich flexibel über eine mindestens 2280 Pixel breite Reihe;
das äußere Element schneidet Überstand ab. Einzelne Buchrücken werden in einer
26-Sekunden-Folge sanft ein Stück nach vorn gezogen und zurückgeschoben. Kein
Buch verlässt die Reihe. Nur CSS-Transformationen bewegen die Bücher. Ein
Visibility-Controller pausiert sie außerhalb des Sichtbereichs, in verborgenen
Tabs und bei reduzierter Bewegung; es läuft keine JavaScript-Animationsschleife.


## Bildschirmfüllender Einstieg auf Desktop und Tablet

Kopfzeile und Hero ergeben zusammen eine kleine Viewport-Höhe (`100svh`,
mit `100vh` als Fallback). Die Kopfzeilenabstände reagieren auf die Höhe des
Fensters; der Hero nutzt die verbleibende Fläche. Der nächste Abschnitt beginnt
unterhalb dieses Einstiegs und wird erst beim Scrollen sichtbar.

Die Produktbühne füllt die Höhe ihrer Grid-Zeile. Beide Telefonbreiten richten
sich nach Bühnenbreite und Bühnenhöhe, mit festen Obergrenzen. Die Geräte
bleiben auch bei flachen Fenstern als gemeinsame Gruppe mittig ausgerichtet.
Maus- und Scroll-Parallax bleiben erhalten. Die bestehende mobile Ansicht und
das Layout für schmale Querformate bleiben separat. Bei extrem geringer Höhe
darf der Hero zugunsten lesbarer Inhalte höher als ein Viewport sein.

Visuell und über Geometrie geprüft: 1920×1080, 1440×900, 1366×768,
1280×600, 1024×768, 768×1024, 820×1180 und 1051×400; außerdem die
bestehende mobile Ansicht mit 390×760. Keine horizontalen Überstände;
Kopfzeile und Hero enden in allen genannten Größen am ersten Bildschirmrand.


## Flüssiger Budget-Ablauf

Die Buchflüge verwenden vorberechnete, kontinuierliche Kurven statt wiederholtem
Abbremsen an einzelnen Wegpunkten. Position und Geschwindigkeit stimmen am
Budgetübergang überein; Abbuchung und Ankunft behalten ihre bisherigen
Zeitpunkte. Einhundert kurze CSS-Abschnitte werden vom Browser interpoliert,
ohne JavaScript-Berechnung pro Bild.

Bei der Landung liegt das neue Buch sofort exakt auf seiner späteren Position,
einschließlich des seitlichen Versatzes. Nur der bisherige Stapel federt in
200 Millisekunden eine Buchhöhe nach unten. Dadurch entfällt der bisherige
Sprung des neuen Buchs um eine Buchhöhe. Die Bewegung pausiert gemeinsam mit
dem Flug außerhalb des Sichtbereichs und im verborgenen Tab.

Das abgewiesene Buch erreicht die Budgetgrenze zweimal. Es hebt sich danach
erst über die Kartonklappen, fliegt über die Öffnung zurück und sinkt senkrecht
hinein. Seine Größe bleibt bis über der Öffnung unverändert. Die Klappen
öffnen und schließen mit 24 statt 15 Vektorframes; die beiden schmalen
Bildstreifen bleiben deutlich kleiner als ein zusätzliches Video. Es gibt
weiterhin genau zwei Käufe, keinen automatischen Budget-Neustart und keine
neue Endlosschleife.
