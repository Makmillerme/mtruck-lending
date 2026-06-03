import { chromium } from "playwright";
import fs from "node:fs";

const URL = process.env.DEBUG_URL || "http://localhost:3000/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#catalog", { timeout: 45000 });

const metrics = await page.evaluate(async () => {
  const catalog = document.getElementById("catalog");
  const track = catalog?.querySelector(".catalog-brand-marquee-track");
  const cards = catalog?.querySelectorAll(".catalog-brand-card");
  const imgs = catalog?.querySelectorAll("img");

  const before = {
    marqueeAnimation: track ? getComputedStyle(track).animationName : null,
    pillCount: catalog?.querySelectorAll(".catalog-brand-marquee-pill").length ?? 0,
    cardCount: cards?.length ?? 0,
    imgCount: imgs?.length ?? 0,
    catalogContain: catalog ? getComputedStyle(catalog).contain : null,
  };

  const catalogTop =
    (catalog?.offsetTop ?? 0) - Math.floor(window.innerHeight * 0.15);
  const catalogEnd =
    catalogTop + (catalog?.offsetHeight ?? 0) - Math.floor(window.innerHeight * 0.35);
  const step = Math.max(50, Math.floor(window.innerHeight * 0.18));

  const frames = [];
  let last = performance.now();

  for (let y = Math.max(0, catalogTop); y <= catalogEnd; y += step) {
    window.scrollTo({ top: y, behavior: "auto" });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const now = performance.now();
    frames.push(now - last);
    last = now;
  }

  const sorted = [...frames].sort((a, b) => a - b);
  const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
  const jank = frames.filter((f) => f > 32).length;

  return {
    before,
    afterScroll: {
      marqueeAnimation: track ? getComputedStyle(track).animationName : null,
    },
    fps: {
      avgMs: Math.round(avg * 10) / 10,
      p95Ms: Math.round(p95 * 10) / 10,
      estimatedFps: Math.round(1000 / avg),
      jankFramesOver32ms: jank,
      sampleCount: frames.length,
    },
  };
});

await browser.close();

const line = JSON.stringify({
  sessionId: "1a1cfd",
  runId: "catalog-fps-pre-fix",
  hypothesisId: "summary",
  location: "scripts/debug-catalog-fps.mjs",
  message: "catalog-scroll-fps",
  data: metrics,
  timestamp: Date.now(),
});
fs.appendFileSync("debug-1a1cfd.log", line + "\n");
console.log(JSON.stringify(metrics, null, 2));
