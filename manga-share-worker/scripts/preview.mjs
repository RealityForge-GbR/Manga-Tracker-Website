import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { handleRequest } from "../src/app.js";

const port = Number(process.env.PORT || 4173);
const publicRoot = new URL("../public/", import.meta.url);
const types = { png: "image/png", webp: "image/webp" };
const env = {
  MANGA_API_BASE: "https://api.manga.realityforge.eu",
  // Public release signing fingerprint; mirrors the production config, never a private key.
  ANDROID_SHA256_CERT_FINGERPRINTS: "E8:A3:66:B3:9E:0F:C4:91:2A:6F:25:27:A6:A0:AA:54:1D:05:CA:44:F1:48:41:5B:29:88:AA:5F:3A:1A:34:05",
  ASSETS: { async fetch(request) {
    const path = new URL(request.url).pathname;
    try {
      const data = await readFile(new URL(`.${path}`, publicRoot));
      return new Response(request.method === "HEAD" ? null : data, { headers: {
        "Content-Type": types[path.split(".").pop()] || "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
      } });
    } catch { return new Response("Not Found", { status: 404 }); }
  } },
};
const server = createServer(async (incoming, outgoing) => {
  try {
    const request = new Request(`http://127.0.0.1:${port}${incoming.url}`, {
      method: incoming.method, headers: incoming.headers,
    });
    const response = await handleRequest(request, env);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error(error.message);
    outgoing.writeHead(500); outgoing.end("Preview error");
  }
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Manga Tracker local preview: http://127.0.0.1:${port}/`);
  console.log(`Assets: ${fileURLToPath(publicRoot)}`);
  console.log("Homepage needs no API requests. Detail pages use public read-only API GETs.");
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
