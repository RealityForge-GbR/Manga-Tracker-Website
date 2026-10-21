import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const data = (relative) => readFileSync(new URL(relative, import.meta.url));
const webpSize = (bytes) => {
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
  assert.equal(bytes.toString("ascii", 8, 16), "WEBPVP8X");
  assert.ok(bytes[20] & 0x10, "cat artwork retains its alpha channel");
  return [bytes.readUIntLE(24, 3) + 1, bytes.readUIntLE(27, 3) + 1];
};

test("the cat sprite contains 15 preserved original frames within a bounded download", () => {
  const manifest = JSON.parse(data("../docs/cat-animation/manifest.json"));
  assert.equal(manifest.frameCount, 15);
  assert.equal(manifest.frames.length, 15);
  assert.equal(manifest.fps, 8);
  assert.equal(new Set(manifest.frames.map((frame) => frame.sha256)).size, 15);
  for (const [index, frame] of manifest.frames.entries()) {
    assert.equal(frame.frame, index + 1);
    const original = data(`../docs/cat-animation/${frame.file}`);
    assert.equal(createHash("sha256").update(original).digest("hex"), frame.sha256);
    assert.deepEqual([original.readUInt32BE(16), original.readUInt32BE(20)], frame.size);
    assert.equal(original[25], 6, "the original PNG remains RGBA");
  }
  const sprite = data("../public/landing/manga-cat-sprite.webp");
  const still = data("../public/landing/manga-cat-still.webp");
  assert.deepEqual(webpSize(sprite), [manifest.frameSize[0] * 15, manifest.frameSize[1]]);
  assert.deepEqual(webpSize(still), manifest.frameSize);
  assert.equal(sprite.length, manifest.spriteBytes);
  assert.equal(still.length, manifest.stillBytes);
  assert.ok(sprite.length < 750_000, "the whole animated strip stays below750KB");
  assert.ok(still.length < 75_000, "the static fallback stays small");
});
