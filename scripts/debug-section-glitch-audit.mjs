import { chromium } from "playwright";
import fs from "node:fs";

const URL = process.env.DEBUG_URL || "http://localhost:3000/";

async function auditPage(page, width) {
  await page.setViewportSize({ width, height: 800 });
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#about", { timeout: 45000 });
  await page.waitForSelector("#catalog", { timeout: 45000 });
  await page.waitForTimeout(500);

  return page.evaluate(async () => {
    const samples = [];
    const about = document.getElementById("about");
    const catalog = document.getElementById("catalog");

    const readState = (label) => {
      const aboutStyle = about ? getComputedStyle(about) : null;
      const catalogStyle = catalog ? getComputedStyle(catalog) : null;
      const marquee = document.querySelector(".catalog-brand-marquee-track");
      const marqueeStyle = marquee ? getComputedStyle(marquee) : null;
      return {
        label,
        scrollY: Math.round(window.scrollY),
        aboutCv: aboutStyle?.contentVisibility ?? null,
        aboutContain: aboutStyle?.contain ?? null,
        aboutActive: about?.hasAttribute("data-about-active") ?? false,
        catalogCv: catalogStyle?.contentVisibility ?? null,
        catalogContain: catalogStyle?.contain ?? null,
        marqueePlay: marqueeStyle?.animationPlayState ?? null,
        truckOpacity: about
          ? getComputedStyle(about.querySelector(".about-truck-stage > div") || about).opacity
          : null,
      };
    };

    const step = Math.max(80, Math.floor(window.innerHeight * 0.25));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    for (let y = 0; y <= maxScroll; y += step) {
      window.scrollTo({ top: y, behavior: "auto" });
      await new Promise((r) => setTimeout(r, 120));
      samples.push(readState(`scroll-${y}`));
    }

    let marqueeToggles = 0;
    let lastPlay = samples[0]?.marqueePlay;
    for (const s of samples) {
      if (s.marqueePlay && lastPlay && s.marqueePlay !== lastPlay) marqueeToggles += 1;
      lastPlay = s.marqueePlay;
    }

    let aboutActiveToggles = 0;
    let lastActive = samples[0]?.aboutActive;
    for (const s of samples) {
      if (s.aboutActive !== lastActive) aboutActiveToggles += 1;
      lastActive = s.aboutActive;
    }

    return {
      samples: samples.filter((_, i) => i % 2 === 0 || i === samples.length - 1),
      marqueeToggles,
      aboutActiveToggles,
      aboutUsesDeferred: about?.classList.contains("landing-section-deferred") ?? false,
    };
  });
}

const browser = await chromium.launch();
const results = [];
for (const w of [390, 1280]) {
  const page = await browser.newPage();
  results.push({ width: w, ...(await auditPage(page, w)) });
  await page.close();
}
await browser.close();

const line = JSON.stringify({
  sessionId: "1a1cfd",
  runId: "playwright-glitch-post-fix",
  hypothesisId: "summary",
  location: "scripts/debug-section-glitch-audit.mjs",
  message: "section-glitch-scroll-audit",
  data: { url: URL, results },
  timestamp: Date.now(),
});
fs.appendFileSync("debug-1a1cfd.log", line + "\n");
console.log(JSON.stringify(results, null, 2));
