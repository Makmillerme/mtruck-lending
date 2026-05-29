import sharp from "sharp";
import { statSync } from "node:fs";
import path from "node:path";

const input = path.join(process.cwd(), "public/images/hero-road-bg.png");
const outDir = path.join(process.cwd(), "public/images");

async function write(name, pipeline) {
  const dest = path.join(outDir, name);
  await pipeline.toFile(dest);
  const kb = Math.round(statSync(dest).size / 1024);
  console.log(`${name}: ${kb} KB`);
}

const base = sharp(input).rotate();

await write(
  "hero-road-bg.webp",
  base.clone().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }),
);

await write(
  "hero-road-bg-mobile.webp",
  base.clone().resize({ width: 960, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }),
);

await write(
  "hero-road-bg.avif",
  base.clone().resize({ width: 1920, withoutEnlargement: true }).avif({ quality: 65, effort: 6 }),
);

console.log("Hero assets optimized.");
