import fs from "node:fs/promises";
import path from "node:path";

const rawDir = path.join(process.cwd(), "data", "raw");
const photosDir = path.join(process.cwd(), "public", "photos");
const videosDir = path.join(process.cwd(), "public", "videos");
await fs.mkdir(photosDir, { recursive: true });
await fs.mkdir(videosDir, { recursive: true });

const posts = JSON.parse(await fs.readFile(path.join(rawDir, "posts.json"), "utf8"));
const items = Array.isArray(posts) ? posts : [];
const urls = [];
for (const item of items) {
  const candidates = [item.videoUrl, item.displayUrl, item.imageUrl, item.thumbnailUrl, ...(Array.isArray(item.images) ? item.images : [])];
  for (const url of candidates) if (typeof url === "string" && /^https?:/i.test(url)) urls.push({ url, video: /video/i.test(url) || Boolean(item.videoUrl) });
}
const unique = [...new Map(urls.map(x => [x.url, x])).values()];
for (let i = 0; i < unique.length; i++) {
  const item = unique[i];
  try {
    const res = await fetch(item.url, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.instagram.com/" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") || "";
    const ext = item.video || type.includes("video") ? "mp4" : type.includes("png") ? "png" : "jpg";
    const dir = ext === "mp4" ? videosDir : photosDir;
    const file = path.join(dir, `instagram-${String(i + 1).padStart(2, "0")}.${ext}`);
    await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
    console.log(`OK  ${file}`);
  } catch (error) {
    console.log(`FAIL ${item.url} ${error.message}`);
  }
}
