import sharp from "sharp";
import { statSync, existsSync } from "node:fs";
import path from "node:path";

const brandsDir = path.join(process.cwd(), "public/brands");
const input = path.join(brandsDir, "mercedes.svg");
const output = path.join(brandsDir, "mercedes-card.webp");

if (!existsSync(input)) {
  console.error("Missing:", input);
  process.exit(1);
}

await sharp(input, { density: 144 })
  .resize({ width: 320, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(output);

const kb = Math.round(statSync(output).size / 1024);
console.log(`mercedes-card.webp: ${kb} KB`);

if (statSync(output).size > 80 * 1024) {
  console.warn("Warning: mercedes-card.webp exceeds 80 KB target");
  process.exit(1);
}

console.log("Brand card assets optimized.");
