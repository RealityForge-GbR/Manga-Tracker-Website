# Manga Tracker Share Worker

Serverseitig gerenderte Website- und Share-Seiten für die Hauptdomain `mangatracker.de` und die bestehende Domain `manga.realityforge.eu`. `www.mangatracker.de` leitet mit HTTP 308 unter Erhalt von Pfad und Query auf `https://mangatracker.de` weiter. Der Worker ist vom statischen GitHub-Pages-Auftritt unter `realityforge.eu` getrennt.

Seit dem Umzug vom 12. Oktober 2026 wird ausschließlich aus `RealityForge-GbR/Manga-Tracker-Website/manga-share-worker/` in den unverändert benannten Worker `realityforge-manga-share` veröffentlicht. Die Kopie im Root-Repository ist nur historischer Bestand. Kein zweiter Worker und kein automatischer Deployment-Workflow werden eingerichtet.

## Lokale Entwicklung

Für die Landingpage-Designreview ohne Cloudflare-Zugriff genügt vom
Worker-Verzeichnis aus `npm run preview`. Die Vorschau läuft unter
`http://127.0.0.1:4173/`, bindet ausschließlich an Loopback und verwendet den
gleichen Request-Handler mit lokalen Assets. Eine Startseitenansicht benötigt
keine API-Anfrage. Quellen, Screenshot-Herkunft, Versionsgrenzen und QA sind in
[der Landingpage-Review](docs/landing-review.md) dokumentiert.

Voraussetzungen: Node.js 22 oder neuer und das bestehende Cloudflare-Konto mit Zugriff auf die Zonen `realityforge.eu` und `mangatracker.de`.

```powershell
npm ci
npm test
npm run dev
```

Die lokale Startseite liegt anschließend unter der von Wrangler ausgegebenen Adresse. Beispielroute: `/manga/9783551771575`.

## Konfiguration

- `MANGA_API_BASE` verweist ausschließlich auf die bestehende Manga-API. Der Standard und beide Wrangler-Konfigurationen verwenden `https://api.manga.realityforge.eu`. Ein noch konfigurierter alter API-Host wird ebenfalls auf diese kanonische Adresse normalisiert.
- `MANGA_API` ist eine Cloudflare-Service-Bindung zum bestehenden Worker `manga-tracker-api`. Produktionsabfragen bleiben dadurch intern im Cloudflare-Netz; `MANGA_API_BASE` liefert weiterhin die öffentlichen Cover-URLs.
- `ANDROID_SHA256_CERT_FINGERPRINTS` enthält einen oder mehrere, durch Kommas getrennte SHA-256-Fingerprints des bei Google Play verwendeten App-Signing-Zertifikats. Der Fingerprint ist kein Geheimnis, muss jedoch exakt aus der Play Console übernommen werden.

Die Produktionskonfiguration enthält den öffentlichen App-Signing-SHA-256-Fingerprint aus dem offiziellen Digital-Asset-Links-Snippet der Google Play Console für **Manga Tracker**, Paket `eu.realityforge.mangatracker`, read-only geprüft am 10. Oktober 2026:

```text
E8:A3:66:B3:9E:0F:C4:91:2A:6F:25:27:A6:A0:AA:54:1D:05:CA:44:F1:48:41:5B:29:88:AA:5F:3A:1A:34:05
```

Dieser Wert stammt aus **App-Signatur → Digital Asset Links-JSON-Datei**, nicht aus **Zertifikat des Uploadschlüssels**. Nach einem App-Signing-Schlüsselwechsel müssen die von Google Play für installierte Versionen verwendeten Zertifikate erneut geprüft und gegebenenfalls als kommaseparierte Liste ergänzt werden. Syntaktische Validität allein bestätigt kein Zertifikat.

Ohne die Variable liefert `/.well-known/assetlinks.json` HTTP 200 und JSON mit leerer Fingerprint-Liste und `X-Assetlinks-Configuration: incomplete`. Ungültige Einträge werden ausgeschlossen und als `invalid` gemeldet, auch bei einer gemischten Liste. Unvollständige/ungültige Konfigurationen werden nicht gecacht. Nur vollständig gültige Listen erhalten `complete`; die Route leitet niemals weiter.

## Veröffentlichung

`wrangler.jsonc` dient der Entwicklung. `wrangler.production.jsonc` ergänzt die verifizierte Account-ID und alle drei Custom Domains. Den Produktions-Build mit dieser Datei prüfen:

```powershell
npm test
npx wrangler deploy --dry-run --config wrangler.production.jsonc
npm run deploy
node scripts/verify-public.mjs
```

Ein vorhandener `CLOUDFLARE_API_TOKEN` muss auch den Asset-Upload für diesen Worker erlauben. Beim Umzug fehlte dem geerbten Token diese Berechtigung; die bereits vorhandene Wrangler-OAuth-Anmeldung wurde stattdessen verwendet. In einer lokalen PowerShell-Sitzung kann dafür vor `npm run deploy` die geerbte Variable mit `$env:CLOUDFLARE_API_TOKEN = $null` nur für diesen Prozess entfernt werden. Keine Tokenwerte ausgeben oder neue Berechtigungen ohne Bedarf anlegen.

Die alte Custom Domain und das Service-Binding müssen bei jedem Deployment erhalten bleiben. Die alte API-Adresse `manga-tracker-api.realityforgeeu.workers.dev` bleibt für bereits veröffentlichte Apps als bestehende 307-Brücke zur kanonischen API erreichbar; dieser Share-Worker ändert den Backend-Worker nicht.

Die Root-Website und ihr GitHub-Pages-Workflow bleiben unverändert. Der Worker benötigt keine Secrets für die Manga-API und greift nur über feste, serverseitig konfigurierte URLs darauf zu.

## Cache und Fehlerverhalten

- Erfolgreiche SSR-Seiten: 15 Minuten Edge-Cache, 1 Minute Browser-Cache.
- Nicht gefundene Manga: 2 Minuten Edge-Cache.
- Backendfehler, Timeouts und ungültige Antworten: HTTP 503 und `no-store`.
- Cover werden direkt von der kanonischen bestehenden API ausgeliefert. Die Service-Bindung prüft per GET mit kleinem Range die HTTP-Antwort, den Bild-Content-Type und die Dateisignatur. Ein 307 vom alten API-Host wird ausschließlich zur identischen Route der kanonischen API verfolgt; andere Redirects werden abgelehnt.
- Fehlende Cover, 404, 502, ungültige Bildantworten oder Netzwerkfehler verwenden das vorhandene `public/manga-tracker-og.png` auch für Social-Media-Metadaten. Browserseitige spätere HTTP-/Decode-Fehler wechseln einmalig auf dasselbe Bild. Der feste kleine Script-Block ist per CSP-SHA-256 autorisiert; Inline-Event-Handler und beliebige Scripts bleiben gesperrt.
- Cache-Namespace `v4` umgeht alte HTML-Einträge ohne globale Cache-Löschung. Die vollständige URL inklusive Host bildet den Cache-Key; Query-Parameter beeinflussen die Darstellung nicht und werden aus dem Key entfernt.
- Nur exakt freigegebene öffentliche Hosts und lokale Entwicklungsadressen werden akzeptiert. Fremde Hosts und widersprüchliche Host-Header liefern ungecachetes HTTP 421. Forwarded-Header werden nicht für URLs verwendet. Canonical, Open Graph und Fallback-Adressen verwenden den fest zugeordneten HTTPS-Origin der angefragten Domain. HTTP wird auf diesen festen HTTPS-Origin weitergeleitet.

## Explizites Öffnen auf Android

Normale HTTPS-Manga-Links unter **manga.realityforge.eu** werden bei installierter Play-Version und verifizierter Domain durch Android an die App übergeben. Nur dort erscheint in Android-Chrome zusätzlich die dezente Aktion **In Manga Tracker öffnen**: ein erst beim Antippen verwendeter, auf das Paket begrenzter Intent mit der aktuellen Manga-Webseite als Browser-Fallback. Ohne App bleibt die Webseite erreichbar; der Play-Store-Link bleibt erhalten. Andere Plattformen, bekannte alternative Browser und WebViews erhalten diese Chrome-spezifische Aktion nicht.

Unter **mangatracker.de** wird kein Android-Intent und keine App-Öffnen-Aktion ausgegeben. Die veröffentlichte App unterstützt diese Domain noch nicht; neue Links bleiben Browser-Seiten mit funktionierendem Google-Play-Button. `assetlinks.json` wird bereits direkt mit dem verifizierten öffentlichen App-Signing-Fingerprint bereitgestellt. Die Android-Manifeständerung gehört in ein späteres App-Update und ist nicht Teil dieses Umzugs.

## Bestätigte Produktionsdiagnose (10. Oktober 2026)

- Reproduktion `/manga/9783964335388`: HTML und Open Graph verwendeten die alte workers.dev-Cover-URL. Diese antwortet mit 307 auf `api.manga.realityforge.eu`; dort antwortet das Cover mit HTTP 200 und `image/jpeg`. Die alte HTML-CSP erlaubte nur den alten API-Host und blockierte dadurch das Ziel des Redirects.
- Das vorhandene Fallback-Bild antwortete mit HTTP 200 und `image/png`, wurde bei einem browserseitigen Bildfehler aber nicht automatisch eingesetzt.
- Produktive `assetlinks.json`: HTTP 200, `application/json`, kein Redirect, jedoch leere Fingerprint-Liste und `X-Assetlinks-Configuration: incomplete`. Die Produktions-Secrets-Liste war leer. Die verifizierte App-Signing-Variable war nicht konfiguriert.
- Die aktuelle Produktionsversion hatte die interne `MANGA_API`-Service-Bindung zu `manga-tracker-api`. Android-main verwendet bereits die kanonische API und den passenden `autoVerify`-Intent-Filter für `https://manga.realityforge.eu/manga/`. Die bestehende Backend-Brücke für ältere Apps bleibt unangetastet.

## Historische Freigabeschritte des Cover-/App-Links-Fixes

Der folgende Abschnitt dokumentiert die frühere Freigabe des bereits übernommenen Cover-/App-Links-Fixes. Für den aktuellen Domainumzug gelten die Veröffentlichungskommandos oben und `MIGRATION.md`.

1. Nach Freigabe den PR mergen und den Share-Worker mit `wrangler.production.jsonc` veröffentlichen. Dabei die vorhandenen Domains und Bindings erhalten; kein Backend-Deployment erforderlich.
2. Die neue öffentliche Fingerprint-Variable aus der Produktionskonfiguration aktivieren. Falls inzwischen eine gleichnamige Secret-Variable angelegt wurde, vor Veröffentlichung deren Wert und Behandlung prüfen; sie darf den verifizierten Wert nicht unbeabsichtigt ersetzen.
3. Falls die alte HTML-Antwort weiterhin aus einem vorgeschalteten Cache kommt, gezielt `https://manga.realityforge.eu/manga/9783964335388` und gegebenenfalls die Variante mit abschließendem `/` invalidieren. Bei veralteter Asset-Links-Antwort nur `https://manga.realityforge.eu/.well-known/assetlinks.json` ergänzen. Keine globale Cache-Löschung. Die geprüfte alte Antwort hatte `CF-Cache-Status: HIT` und `max-age=14400`; gegebenenfalls die bestehende Cache-Regel auf ihre Übersteuerung der Worker-Header prüfen.
4. Die folgende Kontrollliste live ausführen. Die tatsächliche Übergabe an eine installierte Play-Version erfordert zusätzlich einen Android-Gerätetest; lokale SSR-/Script-Tests ersetzen die Android-Domainverifizierung nicht.

## Kontrollliste nach dem Deployment

1. Startseite und vier Manga-Routen im Browser prüfen.
2. Quelltext ohne JavaScript auslesen und Titel, Beschreibung, Canonical, Open Graph und Twitter Card kontrollieren.
3. `/.well-known/assetlinks.json` auf HTTP 200, `application/json`, keinen Redirect, den oben verifizierten App-Signing-Fingerprint und `X-Assetlinks-Configuration: complete` prüfen.
4. Darstellung bei 360, 390, 412, 768, 1280 und 1920 Pixel Breite kontrollieren.
5. Einen ungültigen ISBN-Link, einen nicht vorhandenen Manga und einen simulierten Backendfehler prüfen.
6. Mit einer aus Google Play installierten App die Domainverifizierung und das Antippen eines HTTPS-Manga-Links prüfen. Bei deaktiviertem „Unterstützte Links öffnen“ die Android-Einstellung berücksichtigen. Die Chrome-Öffnen-Aktion zusätzlich mit und ohne installierte App prüfen; iOS und Desktop bleiben normale Webseiten.
7. Die alte API-Adresse weiterhin auf die bestehende 307-Brücke und das unveränderte kanonische Ziel prüfen.

Referenzen: [Android Digital Asset Links](https://developer.android.com/training/app-links/configure-assetlinks), [Chrome Android Intents](https://developer.chrome.com/docs/android/intents), [Cloudflare HTTP Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/).
