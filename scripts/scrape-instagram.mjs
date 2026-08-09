import fs from "node:fs/promises";
import path from "node:path";

const token = process.env.APIFY_TOKEN;
const profileUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/jagnathsanitaries/";
if (!token) throw new Error("APIFY_TOKEN is missing. Put it in .env.local before running this script.");

const username = new URL(profileUrl).pathname.split("/").filter(Boolean)[0];
const run = async (actor, body) => {
  const response = await fetch(`https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Apify request failed: ${response.status} ${await response.text()}`);
  return response.json();
};

const out = path.join(process.cwd(), "data", "raw");
await fs.mkdir(out, { recursive: true });
const profile = await run("apify~instagram-profile-scraper", { usernames: [username] });
const posts = await run("apify~instagram-scraper", { directUrls: [profileUrl], resultsType: "posts", resultsLimit: 30 });
await fs.writeFile(path.join(out, "profile.json"), JSON.stringify(profile, null, 2));
await fs.writeFile(path.join(out, "posts.json"), JSON.stringify(posts, null, 2));
console.log(`Saved ${Array.isArray(posts) ? posts.length : 0} posts.`);
