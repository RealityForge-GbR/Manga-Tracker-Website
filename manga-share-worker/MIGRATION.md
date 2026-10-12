# Domainumzug – 12. Oktober 2026

## Ausgangslage und Quelle

- Repository-ID `1318212310`: tatsächliche GitHub-Umbenennung von `RealityForge-GbR/manga-neuheiten` nach `RealityForge-GbR/Manga-Tracker-Website`, mit allen 26 bisherigen Commits. Ausgangscommit `47acc3eb14f26b20bfb435c35fe43b138956ff0b`.
- Worker-Quelle: Root-Repository, Commit `9965cfb0db5519bacb11d93bcfde789ebcb329d1`, Ordner `manga-share-worker/`. Quellcode, Tests, Paket-/Lockdateien, Wrangler-Konfiguration, `.gitignore`, Fallback-Bild und Dokumentation übernommen. Der ursprüngliche Ordner und der Root-Pages-Workflow bleiben unangetastet.
- Übernommenes Bild: Git-Blob `98cfddc18dcbdf67592928fe5b8af0d51752ad2c`; keine neuen Bildassets erforderlich.
- Vor Änderungen: 37/37 vorhandene Tests bestanden. Nach Erweiterung: 49/49 Tests; Produktions-Dry-Run mit Wrangler 4.149.0 bestanden. Sicherheitskorrekturen der Entwicklungsabhängigkeiten innerhalb des bestehenden Versionsbereichs übernommen; npm-Audit meldet 0 Schwachstellen.
- Produktionsversion vor Umzug: `beac9118-d3a7-4b34-9365-a12cc37c49bb`, 100 % Traffic; bestehender Worker `realityforge-manga-share` und Custom Domain `manga.realityforge.eu` bestätigt.
- Worker-Builds hatten keine Git-Repository-Verbindung. Es werden keine parallelen Deployments oder automatischen Worker-Builds eingerichtet.
- GitHub Pages hatte `main`/Root und den CNAME `manga.realityforge.eu`. Die öffentliche Domain wurde bereits vom Cloudflare-Worker ausgeliefert. Um Push-Builds zu verhindern, Pages-Quelle auf GitHub Actions umgestellt; es wird kein Pages-Workflow angelegt. Die Umbenennung selbst löste den GitHub-eigenen Pages-Lauf `38219107455` aus; er endete erfolgreich.

## DNS und Hosting

- Domain heute neu bei INWX registriert; alte Nameserver: `ns.inwx.de`, `ns2.inwx.de`, `ns3.inwx.eu`.
- INWX-Zone enthielt nur Standard-Parking-A-Einträge für Apex, www und `*`, sowie SOA/NS. Keine MX-, TXT-, CAA- oder E-Mail-Konfiguration. INWX zeigte für alle Domains kein eingerichtetes DNSSEC; kein DS wird entfernt.
- Neue Zone im bestehenden Account `301b9e2cebe3502a8ea4e421b5df690b`, Free-Tarif. Tatsächlich zugewiesene Nameserver: `penny.ns.cloudflare.com`, `santino.ns.cloudflare.com`.
- Die automatisch importierten Apex-/www-Parking-Einträge werden durch die Worker-Custom-Domains ersetzt. Der unbenutzte Wildcard-Parking-Eintrag wird nicht übernommen; dessen Kopie wurde von der automatischen Freigabe abgelehnt. Keine funktionalen Subdomain-Abhängigkeiten beobachtet.
- Ziel-Custom-Domains desselben Workers: `manga.realityforge.eu`, `mangatracker.de`, `www.mangatracker.de`.

## Verhalten und Grenzen

- Kein Redesign; vorhandene Startseite, Manga-SSR, Cover und Fallback bleiben erhalten.
- Host-Allowlist, feste HTTPS-Origins, HTTP-/www-Weiterleitung, hostabhängige Metadaten und Cache-Namespace v4 verhindern Host-Manipulation, offene Redirects und hostübergreifende HTML-Cache-Verwechslungen.
- Beide Asset-Links-Endpunkte liefern direkt HTTP 200 JSON mit dem bestehenden verifizierten Play-Signing-Zertifikat. Auf der neuen Domain werden keine Android-Intent-Links angeboten. App Links dort benötigen ein späteres Android-Update.
- API `https://api.manga.realityforge.eu`, Service-Binding `MANGA_API` → `manga-tracker-api`, Backend-Routen/-Auth, Legacy-API-Brücke, Backend-Worker und Produktionsdatenbanken werden nicht geändert. Android-Projekt, PR 23 und Google Play bleiben unangetastet.

## Veröffentlichung und Wiederherstellung

Von diesem Ordner ausschließlich den bestehenden Website-Worker deployen:

```powershell
npm ci
npm test
npx wrangler deploy --dry-run --config wrangler.production.jsonc
npm run deploy
node scripts/verify-public.mjs
```

Bei unerwarteter Auswirkung auf die alte Domain weitere Migration stoppen und die bisherige Version wieder auf 100 % Traffic setzen:

```powershell
npx wrangler rollback beac9118-d3a7-4b34-9365-a12cc37c49bb --config wrangler.production.jsonc
```

Der Rollback betrifft nur den Share-Worker-Code und dessen damalige Bindings/Assets. Domains/DNS getrennt prüfen; `manga.realityforge.eu` niemals entfernen. Keine globale Cache-Löschung, keine Änderungen am Backend und kein Deployment aus dem Root-Repository. Vor einem DNS-Rollback bedenken: Die ursprünglichen INWX-Nameserver liefern nur Parking, keine Manga-Tracker-Website.

Die genaue neue Produktionsversion, aktive Zone und öffentliche Prüfwerte werden nach erfolgreicher Veröffentlichung ergänzt.
