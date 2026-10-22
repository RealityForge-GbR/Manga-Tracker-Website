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

Der Budget-Abschnitt ist ein durchgehendes, farblich abgesetztes Band in
Sekundärhintergrund (#342735). Am Desktop ist er rund 420 statt zuvor 350 Pixel
hoch, mobil rund 434 statt 362 Pixel: jeweils etwa 20 Prozent mehr. Die
Buchbreite steigt am Desktop von 132 auf 190 Pixel. Paket, Monatsbudget und
Sammlungswert stehen auch auf dem Handy von links nach rechts. Die echten
App-Aufnahmen folgen separat.

Die Stapelbewegung orientiert sich an der isometrischen Turmidee von „Stack“
(Ketchapp, https://play.google.com/store/apps/details?id=com.ketchapp.stack),
mit eigenen nativ gezeichneten Büchern. Es werden keine Spielgrafiken übernommen.
Das Paket öffnet seine vier Klappen. Bücher steigen nacheinander aus der Öffnung,
fliegen hinter einer runden Budgetanzeige hindurch und landen von oben auf dem
Stapel. Hinter- und Vorderseite des Pakets liegen auf getrennten Ebenen, damit
Bücher beim Austreten und bei der Rückkehr von den vorderen Flächen verdeckt
werden. Der roséfarbene Ring der Budgetanzeige leert sich bei jedem Kauf. Beim Landen rutschen die älteren Bände nach unten und verschwinden am
Bildrand. Die Zeichnung enthält keine erfundene App-Oberfläche.

Das Beispiel beginnt mit 100 Euro Monatsbudget und acht vorhandenen Bänden im
Wert von 80 Euro. Zehn Käufe zu je 10 Euro lassen den Wert auf 180 Euro / 18 Bände
steigen. Am Budget wird abgebucht, erst bei Ankunft wird der Sammlungswert erhöht.
Bei null Euro wird der nächste Band an der Budgetanzeige aufgehalten. Er kehrt
wieder um und verschwindet zurück im Paket. Budget und Sammlung bleiben dabei
unverändert und anschließend stehen. Ein kleines Schloss kennzeichnet die
Sperre. Es gibt keinen Verkauf, Erlös oder unbemerkten Budget-Neustart.

Die sichtbaren Beschriftungen „Shop“, „10 € pro Band“, „Budget aufgebraucht“ und
die Bandanzahl entfallen. Monatsbudget und Sammlungswert bleiben beschriftet.

Die Bewegung dauert etwa 18,8 Sekunden, davon 2,4 Sekunden für den abgewiesenen
Band und seinen Rückflug. Sie benötigt nur einen Milestone-Timer.
CSS animiert Transformationen und Transparenz. 18 vorbereitete Buchlagen halten
die Anzahl der Elemente begrenzt; der Stapel wächst optisch aus dem Bild.
Außerhalb des Sichtbereichs oder bei verborgenem Tab pausieren Zeit und Bewegung
gemeinsam. Reduzierte Bewegung oder fehlende Browserfunktionen zeigen das
fertige Beispiel mit ausgeschöpftem Budget ohne Timer.


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
