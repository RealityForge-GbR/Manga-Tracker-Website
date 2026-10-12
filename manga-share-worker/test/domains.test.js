import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { handleRequest } from "../src/app.js";

const ISBN = "9783964335388";
const API = "https://api.manga.realityforge.eu";
const PLAY = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";
const fingerprint = "E8:A3:66:B3:9E:0F:C4:91:2A:6F:25:27:A6:A0:AA:54:1D:05:CA:44:F1:48:41:5B:29:88:AA:5F:3A:1A:34:05";
const origins = ["https://mangatracker.de", "https://manga.realityforge.eu"];
const image = readFileSync(new URL("../public/manga-tracker-og.png", import.meta.url));

function env(cover = true, status = 200) {
  return {
    MANGA_API_BASE: API,
    ANDROID_SHA256_CERT_FINGERPRINTS: fingerprint,
    MANGA_API: { fetch: async (request) => {
      assert.ok(request.url.startsWith(`${API}/manga/${ISBN}`));
      if (request.url.endsWith("/cover")) return new Response(cover ? image : "missing", { status: cover ? 200 : 404, headers: { "Content-Type": cover ? "image/png" : "text/plain" } });
      return Response.json({ manga: { isbn: ISBN, title: "Manga Test" } }, { status });
    } },
    ASSETS: { fetch: async () => new Response(image, { headers: { "Content-Type": "image/png" } }) },
  };
}

for (const origin of origins) {
  test(`${origin}: landing, canonical, Open Graph, fallback and real Play link`, async () => {
    const response = await handleRequest(new Request(`${origin}/?campaign=test`), env());
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(`<link rel="canonical" href="${origin}/">`));
    assert.ok(html.includes(`property="og:url" content="${origin}/"`));
    assert.ok(html.includes(`property="og:image" content="${origin}/landing/app-icon-source.png"`));
    assert.ok(html.includes(`href="${PLAY}"`));
    assert.equal(response.headers.get("location"), null);
  });

  test(`${origin}: detail, cover and fallback stay correct for GET and HEAD`, async () => {
    for (const cover of [true, false]) {
      for (const method of ["GET", "HEAD"]) {
        const response = await handleRequest(new Request(`${origin}/manga/${ISBN}/`, { method }), env(cover));
        assert.equal(response.status, 200);
        assert.match(response.headers.get("content-security-policy"), /img-src 'self' https:\/\/api\.manga\.realityforge\.eu/);
        const html = await response.text();
        if (method === "HEAD") { assert.equal(html, ""); continue; }
        assert.ok(html.includes(`<link rel="canonical" href="${origin}/manga/${ISBN}">`));
        assert.ok(html.includes(`property="og:url" content="${origin}/manga/${ISBN}"`));
        assert.ok(html.includes(`data-fallback="${origin}/manga-tracker-og.png"`));
        assert.ok(html.includes(`property="og:image" content="${cover ? `${API}/manga/${ISBN}/cover` : `${origin}/manga-tracker-og.png`}"`));
        assert.ok(html.includes(`href="${PLAY}"`));
      }
    }
  });

  test(`${origin}: assetlinks and image respond directly with security headers`, async () => {
    for (const method of ["GET", "HEAD"]) {
      for (const path of ["/.well-known/assetlinks.json", "/manga-tracker-og.png"]) {
        const response = await handleRequest(new Request(`${origin}${path}`, { method }), env());
        assert.equal(response.status, 200);
        assert.equal(response.headers.get("location"), null);
        assert.equal(response.headers.get("x-content-type-options"), "nosniff");
        if (method === "HEAD") assert.equal(await response.text(), "");
        else if (path.endsWith(".json")) {
          assert.match(response.headers.get("content-type"), /^application\/json/);
          assert.deepEqual((await response.json())[0].target.sha256_cert_fingerprints, [fingerprint]);
        } else assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array(image));
      }
    }
  });

  test(`${origin}: invalid ISBN avoids API; backend errors remain uncached`, async () => {
    for (const path of ["/manga/9783964335389", "/manga/9783964335388%2Fother", "/manga/not-an-isbn"]) {
      const response = await handleRequest(new Request(`${origin}${path}`), { FETCH: () => assert.fail("invalid ISBN must not call API") });
      assert.equal(response.status, 404);
      assert.ok((await response.text()).includes(`href="${PLAY}"`));
    }
    const response = await handleRequest(new Request(`${origin}/manga/${ISBN}`), env(true, 500));
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
}

test("new domain never offers an Android intent; old domain retains the package-specific action", async () => {
  for (const origin of origins) {
    const html = await (await handleRequest(new Request(`${origin}/manga/${ISBN}`), env())).text();
    if (origin.includes("mangatracker.de")) {
      assert.doesNotMatch(html, /intent:\/\/|data-android-intent=|id="open-app"/);
      // Run the same fixed script as Android Chrome with no app action element.
      runInNewContext(/<script>([\s\S]*?)<\/script>/.exec(html)[1], {
        document: { querySelector: () => null, getElementById: () => null },
        navigator: { userAgent: "Mozilla/5.0 (Android 15) Chrome/140.0.0.0" },
      });
    } else assert.match(html, /intent:\/\/manga\.realityforge\.eu\/manga\/9783964335388#Intent;scheme=https;package=eu\.realityforge\.mangatracker/);
  }
});

test("HTTPS and www redirects stay on fixed allowed hosts including adversarial paths", async () => {
  for (const origin of origins) {
    const response = await handleRequest(new Request(`${origin.replace("https:", "http:")}/manga/${ISBN}?x=1`));
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), `${origin}/manga/${ISBN}?x=1`);
  }
  for (const path of ["/", `/manga/${ISBN}?campaign=ads`, "//evil.example/path?next=https://evil.example"]) {
    const response = await handleRequest(new Request(`https://www.mangatracker.de${path}`));
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get("location")).origin, origins[0]);
    assert.equal(response.headers.get("location"), `${origins[0]}${path}`);
  }
});

test("unknown hosts and conflicting Host headers fail before cache, API or assets", async () => {
  for (const url of ["https://evil.example/", "https://mangatracker.de.evil.example/", "https://mangatracker.de:8443/", "https://evil.example/.well-known/assetlinks.json", "https://evil.example/manga-tracker-og.png"]) {
    const response = await handleRequest(new Request(url), { FETCH: () => assert.fail("unknown host must not call API") });
    assert.equal(response.status, 421);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("location"), null);
  }
  const conflict = await handleRequest(new Request(`${origins[0]}/`, { headers: { Host: "evil.example" } }));
  assert.equal(conflict.status, 421);
  const response = await handleRequest(new Request(`${origins[0]}/`, { headers: { Host: "mangatracker.de", "X-Forwarded-Host": "evil.example", Forwarded: "host=evil.example;proto=http" } }));
  assert.equal(response.status, 200);
  assert.doesNotMatch(await response.text(), /evil\.example/);
});

test("cached HTML is isolated by host and bypasses the former v3 namespace", async () => {
  const previous = globalThis.caches;
  const stored = new Map();
  const pending = [];
  globalThis.caches = { default: {
    match: async (key) => stored.get(key.url)?.clone(),
    put: async (key, response) => { stored.set(key.url, response); },
  } };
  try {
    for (const origin of [...origins, ...origins]) {
      const response = await handleRequest(new Request(`${origin}/manga/${ISBN}?campaign=test`), env(false), { waitUntil: (promise) => pending.push(promise) });
      await Promise.all(pending);
      const html = await response.text();
      assert.ok(html.includes(`property="og:url" content="${origin}/manga/${ISBN}"`));
      assert.ok(html.includes(`property="og:image" content="${origin}/manga-tracker-og.png"`));
    }
    assert.deepEqual([...stored.keys()], origins.map((origin) => `${origin}/__manga-share-cache-v4/manga/${ISBN}`));
  } finally {
    if (previous === undefined) delete globalThis.caches;
    else globalThis.caches = previous;
  }
});
