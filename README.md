# Manga Tracker Website

Offizielle Website: https://mangatracker.de. Bestehende Manga-Links unter https://manga.realityforge.eu bleiben erreichbar.

Betreiber ist die RealityForge GbR.

Der produktive Website- und Sharing-Code liegt in [`manga-share-worker/`](manga-share-worker/README.md): `src/` enthält Worker und SSR, `public/` die statischen Assets. `mangatracker.de`, `www.mangatracker.de` und `manga.realityforge.eu` verwenden den bestehenden Cloudflare-Worker `realityforge-manga-share`.

## Automatische Veröffentlichung

Mitarbeiter bearbeiten die produktiven Dateien unter `manga-share-worker/` und pushen ihre Änderungen direkt auf `main`. Jeder Push startet [Tests und Production-Deployment in GitHub Actions](https://github.com/RealityForge-GbR/Manga-Tracker-Website/actions/workflows/deploy-website.yml), ohne Pfadfilter. Nach erfolgreichen Tests und Wrangler-Dry-Run wird die Website ohne Pull Request, Review, manuellen Merge oder zusätzliche Bestätigung veröffentlicht. Ein eigener Cloudflare-Zugang ist für Mitarbeiter nicht erforderlich.

Der Workflow [`.github/workflows/deploy-website.yml`](.github/workflows/deploy-website.yml) verwendet Node.js 22, `npm ci`, `npm test` und ausschließlich `wrangler.production.jsonc`. Nach der Veröffentlichung prüft `node scripts/verify-public.mjs` die öffentlichen Domains, Manga-Seiten, Cover und Android Digital Asset Links. Fehlgeschlagene Tests oder ein fehlgeschlagener Dry-Run verhindern eine neue Veröffentlichung. Status, einzelne Prüfschritte und Fehlerdiagnosen sind unter **GitHub → Actions** sichtbar.

Deployments laufen nacheinander. Ein laufendes Deployment wird durch einen neuen Push nicht abgebrochen; überholte Commits werden vor der Veröffentlichung übersprungen. Die einzige benötigte Repository-Secret-Variable ist `CLOUDFLARE_API_TOKEN`; Account, Worker und Domains stehen in der vorhandenen Produktionskonfiguration. Es werden keine GitHub-Environment-Approvals verwendet.

## Lokal prüfen

```powershell
cd manga-share-worker
npm ci
npm test
npx wrangler deploy --dry-run --config wrangler.production.jsonc
```

Dieses Repository wurde aus `RealityForge-GbR/manga-neuheiten` umbenannt; die Git-Historie bleibt erhalten. Die HTML-, Daten- und Asset-Dateien im Repository-Stamm sowie der alte CNAME sind historischer Bestand und verändern die produktive Website nicht. Der neue Workflow veröffentlicht den Cloudflare-Worker; die GitHub-Pages-Konfiguration und die allgemeine RealityForge-Website bleiben unverändert.

Website-Deployments ausschließlich aus diesem Repository ausführen. Der alte Worker-Ordner im Root-Repository bleibt unverändert und ist keine Deploymentquelle mehr. Der Root-Pages-Workflow wird nicht geändert.

Die API `https://api.manga.realityforge.eu`, die Service-Bindung `MANGA_API` und alle Backend- und Android-Projekte bleiben unverändert. Android App Links für die neue Domain benötigen ein späteres App-Update; neue Website-Links funktionieren bis dahin im Browser.

Prüfprotokoll und Wiederherstellung: [`manga-share-worker/MIGRATION.md`](manga-share-worker/MIGRATION.md).
