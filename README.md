# Manga Tracker Website

Offizielle Website: https://mangatracker.de. Bestehende Manga-Links unter https://manga.realityforge.eu bleiben erreichbar.

Betreiber ist die RealityForge GbR.

Der produktive Website- und Sharing-Code liegt in [`manga-share-worker/`](manga-share-worker/README.md). Beide Domains verwenden denselben bestehenden Cloudflare-Worker `realityforge-manga-share`.

```powershell
cd manga-share-worker
npm ci
npm test
npx wrangler deploy --dry-run --config wrangler.production.jsonc
npm run deploy
```

Dieses Repository wurde aus `RealityForge-GbR/manga-neuheiten` umbenannt; die Git-Historie bleibt erhalten. Die bisherigen statischen HTML-, Daten- und Asset-Dateien sowie der alte CNAME bleiben als bestehender Bestand erhalten. GitHub Pages ist auf die Quelle **GitHub Actions** gestellt; es gibt keinen Pages-Workflow in diesem Repository und keine automatische Veröffentlichung bei einem Push.

Website-Deployments ausschließlich aus diesem Repository ausführen. Der alte Worker-Ordner im Root-Repository bleibt unverändert und ist keine Deploymentquelle mehr. Der Root-Pages-Workflow wird nicht geändert.

Die API `https://api.manga.realityforge.eu`, die Service-Bindung `MANGA_API` und alle Backend- und Android-Projekte bleiben unverändert. Android App Links für die neue Domain benötigen ein späteres App-Update; neue Website-Links funktionieren bis dahin im Browser.

Prüfprotokoll und Wiederherstellung: [`manga-share-worker/MIGRATION.md`](manga-share-worker/MIGRATION.md).
