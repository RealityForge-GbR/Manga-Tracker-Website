import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { handleRequest } from "../src/app.js";
import { LANDING_ASSETS } from "../src/landing.js";
import { LANDING_MOTION_SCRIPT } from "../src/landing-motion.js";

const PLAY = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";
const assetData = (path) => readFileSync(new URL(`../public${path}`, import.meta.url));
const sha = (data) => createHash("sha256").update(data).digest("hex");

test("homepage works independently of unavailable API and assets bindings", async () => {
  const env = { MANGA_API: { fetch() { assert.fail("Homepage must not query the API"); } }, ASSETS: { fetch() { assert.fail("HTML must not fetch its images server-side"); } } };
  for (const origin of ["https://mangatracker.de", "https://manga.realityforge.eu", "http://127.0.0.1:4173"]) {
    for (const method of ["GET", "HEAD"]) {
      const response = await handleRequest(new Request(`${origin}/?campaign=ads`, { method }), env);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type"), /text\/html/);
      assert.match(response.headers.get("content-security-policy"), /default-src 'none'/);
      const html = await response.text();
      if (method === "HEAD") { assert.equal(html, ""); continue; }
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.ok(html.includes(`href="${PLAY}"`));
      assert.match(html, /id="inhalt" tabindex="-1"/);
      assert.match(html, /class="skip" href="#inhalt"/);
      assert.match(html, /prefers-reduced-motion:reduce/);
      assert.match(html, /a:focus-visible/);
      const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
      assert.deepEqual(scripts.map((match) => match[1]), [LANDING_MOTION_SCRIPT]);
      const scriptDigest = createHash("sha256").update(LANDING_MOTION_SCRIPT).digest("base64");
      assert.match(response.headers.get("content-security-policy"), new RegExp("script-src 'sha256-" + scriptDigest.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "'"));
      assert.doesNotMatch(html, /<script\s|<iframe\b|<form\b|<[a-z][^>]*\son\w+=|google-analytics|googletagmanager|fonts\.googleapis|fbq\(/i);
      assert.doesNotMatch(html, /Hanako/);
      assert.match(html, /src="\/landing\/notifications\.webp"/);
      assert.match(html, /Echter App-Screenshot · Entwicklungsvorschau<br>Simulierte Beispieldaten: Meldungen, Status und Termine/);
      const expectedOrigin = origin.startsWith("http:") ? "https://mangatracker.de" : origin;
      assert.ok(html.includes(`<link rel="canonical" href="${expectedOrigin}/">`));
      assert.ok(html.includes(`property="og:image" content="${expectedOrigin}/landing/app-icon-source.png"`));
    }
  }
});

test("all homepage images are local, dimensioned and exist, with deferred below-fold loading", async () => {
  const html = await (await handleRequest(new Request("https://mangatracker.de/"))).text();
  for (const tag of html.match(/<img\b[^>]+>/g)) {
    const path = /src="([^"]+)"/.exec(tag)[1];
    assert.ok(LANDING_ASSETS.has(path), path);
    assert.ok(assetData(path).length > 1000, path);
    assert.match(tag, /width="\d+" height="\d+"/);
    assert.match(tag, /alt="[^"]*"/);
  }
  assert.equal((html.match(/fetchpriority="high"/g) || []).length, 1);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /Meine Reihen<\/figcaption>/);
  assert.match(html, /Bandstatus<\/figcaption>/);
  for (const path of ["legal-notice/", "privacy-policy/", "privacy-policy/manga-tracker/"]) {
    assert.ok(html.includes(`href="https://realityforge.eu/${path}"`));
  }
});

test("only approved static assets are served, with GET/HEAD, security headers and no API calls", async () => {
  const calls = [];
  const env = { MANGA_API: { fetch() { assert.fail("Static assets must not query the API"); } }, ASSETS: { async fetch(request) {
    const path = new URL(request.url).pathname;
    calls.push(path);
    return new Response(assetData(path), { headers: { "Content-Type": path.endsWith(".png") ? "image/png" : "image/webp" } });
  } } };
  for (const path of LANDING_ASSETS) {
    for (const method of ["GET", "HEAD"]) {
      const response = await handleRequest(new Request(`https://mangatracker.de${path}`, { method }), env);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(response.headers.get("x-frame-options"), "DENY");
      if (method === "HEAD") assert.equal(await response.text(), "");
      else assert.equal(sha(Buffer.from(await response.arrayBuffer())), sha(assetData(path)));
    }
  }
  const expectedCalls = calls.length;
  for (const path of ["/landing/private.png", "/landing/source-map.js", "/landing/assets.json", "/landing/%2fsecret.png"]) {
    assert.equal((await handleRequest(new Request(`https://mangatracker.de${path}`), env)).status, 404);
  }
  assert.equal(calls.length, expectedCalls);
});

test("screenshot provenance checksums match optimized assets; original app icons remain unchanged", () => {
  const manifest = JSON.parse(readFileSync(new URL("../docs/landing-assets.json", import.meta.url)));
  assert.equal(manifest.length, 8);
  for (const asset of manifest) {
    const path = `/landing/${asset.file}`;
    assert.ok(LANDING_ASSETS.has(path));
    assert.equal(sha(assetData(path)), asset.sha256);
    assert.deepEqual(asset.originalSize, [1080, 2400]);
    assert.deepEqual(asset.crop, [0, 110, 1080, 2260]);
    assert.deepEqual(asset.size, [720, 1433]);
    assert.ok(asset.bytes < 200_000, asset.file);
  }
  assert.equal(sha(assetData("/landing/app-icon.png")), "3fdad0ab9e7aa45646f434baca97e6ef5714ce6a9aa35f1dd0afa770486f87ed");
  const original = assetData("/landing/app-icon-source.png");
  assert.equal(createHash("sha1").update(`blob ${original.length}\0`).update(original).digest("hex"), "634555034a8beda9484224cb9b7cfa0040b28a7f");
  assert.equal(original.readUInt32BE(16), 1254);
  assert.equal(original.readUInt32BE(20), 1254);
  assert.equal(sha(assetData("/landing/collection-mascot.webp")), "5a8c5374f9a7509e7dec08c7af298f432fe42c2cc5f3ff0c7b7431965386ddd7");
});

test("homepage bypasses former cached landing without changing detail cache namespace", async () => {
  const previous = globalThis.caches;
  const keys = [];
  globalThis.caches = { default: { async match(key) { keys.push(key.url); return undefined; }, async put() {} } };
  try {
    await handleRequest(new Request("https://mangatracker.de/?campaign=test"));
    assert.deepEqual(keys, ["https://mangatracker.de/__manga-share-cache-vlanding-34/"]);
  } finally {
    if (previous === undefined) delete globalThis.caches; else globalThis.caches = previous;
  }
});
