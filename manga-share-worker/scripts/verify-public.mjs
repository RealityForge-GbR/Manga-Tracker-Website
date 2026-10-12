import assert from "node:assert/strict";

const ISBN = "9783964335388";
const PLAY = "https://play.google.com/store/apps/details?id=eu.realityforge.mangatracker";
const results = [];
async function check(url, verify) {
  try { await verify(); }
  catch (error) {
    results.push({ url, error: error.cause?.code || error.code || error.message });
    process.exitCode = 1;
  }
}
for (const origin of ["https://mangatracker.de", "https://manga.realityforge.eu"]) {
  for (const path of ["/", `/manga/${ISBN}`, "/.well-known/assetlinks.json", "/manga-tracker-og.png"]) {
    const url = `${origin}${path}`;
    await check(url, async () => {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, url);
    assert.equal(response.headers.get("location"), null, url);
    const type = response.headers.get("content-type");
    const result = { url, status: response.status, type };
    if (path.endsWith(".json")) {
      assert.match(type, /^application\/json/);
      assert.equal(response.headers.get("x-assetlinks-configuration"), "complete");
      const target = (await response.json())[0].target;
      assert.equal(target.package_name, "eu.realityforge.mangatracker");
      assert.deepEqual(target.sha256_cert_fingerprints, ["E8:A3:66:B3:9E:0F:C4:91:2A:6F:25:27:A6:A0:AA:54:1D:05:CA:44:F1:48:41:5B:29:88:AA:5F:3A:1A:34:05"]);
    } else if (path.endsWith(".png")) {
      assert.match(type, /^image\/png/);
      assert.ok((await response.arrayBuffer()).byteLength > 1000);
    } else {
      assert.match(type, /^text\/html/);
      const html = await response.text();
      const canonical = `${origin}${path}`;
      assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), url);
      assert.ok(html.includes(`property="og:url" content="${canonical}"`), url);
      assert.ok(html.includes(`href="${PLAY}"`), url);
      assert.match(response.headers.get("content-security-policy"), /img-src 'self' https:\/\/api\.manga\.realityforge\.eu/);
      if (origin.endsWith("mangatracker.de")) assert.doesNotMatch(html, /intent:\/\/|data-android-intent=/);
      result.canonical = canonical;
      result.playLink = true;
      if (path.startsWith("/manga/")) {
        result.cover = /property="og:image" content="([^"]+)"/.exec(html)?.[1];
        const cover = await fetch(result.cover, { redirect: "manual", signal: AbortSignal.timeout(15000) });
        assert.equal(cover.status, 200, result.cover);
        assert.match(cover.headers.get("content-type"), /^image\//);
        await cover.body?.cancel();
      }
    }
    results.push(result);
    });
  }
}
for (const path of ["/", `/manga/${ISBN}?campaign=test`, "//evil.example/path"]) {
  const url = `https://www.mangatracker.de${path}`;
  await check(url, async () => {
  const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 308, url);
  assert.equal(response.headers.get("location"), `https://mangatracker.de${path}`);
  results.push({ url, status: response.status, location: response.headers.get("location") });
  });
}
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
