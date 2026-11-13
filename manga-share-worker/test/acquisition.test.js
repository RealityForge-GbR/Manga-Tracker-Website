import assert from "node:assert/strict";
import test from "node:test";
import { handleRequest, normalizeManga, renderMangaPage } from "../src/app.js";
import { renderLandingPage } from "../src/landing.js";

function links(html) {
  return [...html.matchAll(/href="(https:\/\/play\.google\.com\/store\/apps\/details[^" ]*)"/g)]
    .map((match) => new URL(match[1].replaceAll("&amp;", "&")));
}

function verify(html, placements) {
  const urls = links(html);
  assert.equal(urls.length, placements.length);
  for (const [index, url] of urls.entries()) {
    assert.equal(url.origin, "https://play.google.com");
    assert.equal(url.pathname, "/store/apps/details");
    assert.equal(url.searchParams.get("id"), "eu.realityforge.mangatracker");
    const expected = {
      utm_source: "mangatracker.de", utm_medium: "referral",
      utm_campaign: "website", utm_content: placements[index],
    };
    assert.deepEqual(Object.fromEntries(new URLSearchParams(url.searchParams.get("referrer"))), expected);
    for (const [key, value] of Object.entries(expected)) assert.equal(url.searchParams.get(key), value);
    assert.equal([...url.searchParams].length, 6);
  }
}

test("all homepage download buttons carry the website campaign and individual placement", async () => {
  for (const query of ["", "?utm_source=external&next=https://evil.example&referrer=other"]) {
    const response = await handleRequest(new Request(`https://mangatracker.de/${query}`));
    assert.equal(response.status, 200);
    verify(await response.text(), ["homepage_header", "homepage_hero", "homepage_download"]);
  }
});

test("manga details and unavailable pages carry the same acquisition source", async () => {
  verify(renderMangaPage(normalizeManga({ isbn: "9783964335388", title: "Test Manga" }), null, "https://mangatracker.de"), ["manga_detail", "manga_footer"]);
  const response = await handleRequest(new Request("https://mangatracker.de/manga/invalid"));
  assert.equal(response.status, 404);
  verify(await response.text(), ["error_page"]);
});

test("the legacy host is never incorrectly credited to mangatracker.de", () => {
  const origin = "https://manga.realityforge.eu";
  for (const html of [renderLandingPage(origin), renderMangaPage(normalizeManga({ isbn: "9783964335388", title: "Test Manga" }), null, origin)]) {
    for (const url of links(html)) {
      assert.equal(url.href, "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker");
    }
  }
});
