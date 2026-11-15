import assert from "node:assert/strict";
import test from "node:test";
import { handleRequest } from "../src/app.js";

const ISBN = "9783551771575";
const origin = "https://mangatracker.de";
const share = `/share/manga/${ISBN}`;
const expected = { utm_source: "manga_tracker", utm_medium: "referral", utm_campaign: "manga_share", utm_content: "title_share" };
const env = { FETCH: async (url) => String(url).endsWith("/cover")
  ? new Response(new Uint8Array([255, 216, 255]), { headers: { "Content-Type": "image/jpeg" } })
  : Response.json({ manga: { isbn: ISBN, title: "Synthetic manga" } }) };
function playLinks(html) {
  return [...html.matchAll(/href="(https:\/\/play\.google\.com[^" ]*)"/g)].map(m => new URL(m[1].replaceAll("&amp;", "&")));
}
function verifyShare(html, count = 2) {
  const links = playLinks(html);
  assert.equal(links.length, count);
  for (const url of links) {
    assert.equal(url.searchParams.get("id"), "eu.realityforge.mangatracker");
    assert.equal([...url.searchParams].length, 6);
    for (const [key, value] of Object.entries(expected)) assert.equal(url.searchParams.get(key), value);
    const referrer = new URLSearchParams(url.searchParams.get("referrer"));
    assert.equal([...referrer].length, 4);
    assert.deepEqual(Object.fromEntries(referrer), expected);
    assert.ok(!url.href.includes(ISBN));
  }
}
async function page(path, options = {}, environment = env, ctx = {}) {
  return handleRequest(new Request(origin + path, options), environment, ctx);
}
test("explicit share uses fixed encoded campaign, canonical SEO and retained social URL", async () => {
  const response = await page(share + "?utm_campaign=website&referrer=evil");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  const html = await response.text();
  verifyShare(html);
  assert.ok(html.includes(`<link rel="canonical" href="${origin}/manga/${ISBN}">`));
  assert.ok(html.includes(`property="og:url" content="${origin}${share}"`));
  assert.ok(html.includes('name="robots" content="noindex,follow"'));
  assert.doesNotMatch(html, /gtag|google-analytics|googletagmanager/);
});
test("installed app intent uses old exact parser path; missing app returns to tagged page", async () => {
  const html = await (await page(share)).text();
  const intent = /data-android-intent="([^"]+)"/.exec(html)[1].replaceAll("&amp;", "&");
  assert.equal(intent, `intent://manga.realityforge.eu/manga/${ISBN}#Intent;scheme=https;package=eu.realityforge.mangatracker;S.browser_fallback_url=${encodeURIComponent(origin + share)};end`);
  assert.ok(html.includes(`href="https://manga.realityforge.eu/manga/${ISBN}"`));
  const fallback = decodeURIComponent(/S.browser_fallback_url=([^;]+)/.exec(intent)[1]);
  verifyShare(await (await handleRequest(new Request(fallback), env)).text());
});
test("ordinary title, homepage and legacy keep their original attribution", async () => {
  for (const path of [`/manga/${ISBN}`, `/manga/${ISBN}?utm_campaign=manga_share`, "/"]) {
    const html = await (await page(path)).text();
    for (const url of playLinks(html)) {
      assert.equal(url.searchParams.get("utm_source"), "mangatracker.de");
      assert.equal(url.searchParams.get("utm_campaign"), "website");
    }
  }
  const html = await (await handleRequest(new Request(`https://manga.realityforge.eu/manga/${ISBN}`), env)).text();
  for (const url of playLinks(html)) assert.equal(url.searchParams.has("referrer"), false);
});
test("preview bots and HEAD do not redirect or create conversions", async () => {
  for (const method of ["GET", "HEAD"]) {
    const r = await page(share, { method, headers: { "User-Agent": "WhatsApp/2.0 facebookexternalhit/1.1" } });
    assert.equal(r.status, 200); assert.equal(r.headers.get("location"), null);
    if (method === "HEAD") assert.equal(await r.text(), ""); else verifyShare(await r.text());
  }
  const redirect = await handleRequest(new Request(`https://www.mangatracker.de${share}`));
  assert.equal(redirect.status, 308); assert.equal(redirect.headers.get("location"), origin + share);
});
test("edge cache never mixes normal pages and shared pages in either request order", async () => {
  const previous = globalThis.caches;
  try {
    for (const paths of [[share, `/manga/${ISBN}`], [`/manga/${ISBN}`, share]]) {
      const entries = new Map(); const writes = [];
      globalThis.caches = { default: { match: async key => entries.get(key.url)?.clone(), put: async (key, response) => entries.set(key.url, response) } };
      const ctx = { waitUntil: promise => writes.push(promise) };
      for (const path of [...paths, ...paths]) {
        const html = await (await page(path, {}, env, ctx)).text();
        if (path === share) verifyShare(html);
        else for (const url of playLinks(html)) assert.equal(url.searchParams.get("utm_campaign"), "website");
        await Promise.all(writes);
      }
      assert.equal(entries.size, 2);
    }
  } finally { if (previous === undefined) delete globalThis.caches; else globalThis.caches = previous; }
});
test("valid missing and unavailable shared titles keep attribution without redirect", async () => {
  for (const status of [404, 500]) {
    const r = await page(share, {}, { FETCH: async () => new Response(null, { status }) });
    assert.equal(r.status, status === 404 ? 404 : 503);
    verifyShare(await r.text(), 1);
  }
  for (const path of ["/share/manga/9783551771574", share + "/extra", "/share/manga/%39" + ISBN.slice(1)]) {
    assert.equal((await page(path)).status, 404);
  }
});
