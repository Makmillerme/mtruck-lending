import { chromium } from "playwright";
import fs from "node:fs";

const URL = process.env.DEBUG_URL || "http://localhost:3000/";
const LOG = "debug-1a1cfd.log";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForSelector("#why-us", { timeout: 45_000 });

const audit = await page.evaluate(async () => {
  const catalog = document.getElementById("catalog");
  const whyUs = document.getElementById("why-us");
  const samples = [];
  let ambientOpacityToggles = 0;
  let whyCvToggles = 0;
  let scrollAttrToggles = 0;
  let lastAmbient = "";
  let lastWhyCv = "";
  let lastScrollAttr = "";

  const catalogTop = (catalog?.offsetTop ?? 0) - 200;
  const whyEnd = (whyUs?.offsetTop ?? 0) + 400;
  const step = Math.max(30, Math.floor(window.innerHeight * 0.12));

  for (let y = Math.max(0, catalogTop); y <= whyEnd; y += step) {
    window.scrollTo({ top: y, behavior: "auto" });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const catalogRect = catalog?.getBoundingClientRect();
    const whyRect = whyUs?.getBoundingClientRect();
    const ambient = catalog?.querySelector(".catalog-section-ambient");
    const ambientOp = ambient ? getComputedStyle(ambient).opacity : null;
    const whyCv = whyUs ? getComputedStyle(whyUs).contentVisibility : null;
    const scrollAttr = document.documentElement.dataset.landingScrolling ?? "";
    const catalogSeam = catalog ? getComputedStyle(catalog, "::before").animationName : null;
    const whySeam = whyUs ? getComputedStyle(whyUs, "::before").animationName : null;

    if (ambientOp !== lastAmbient && lastAmbient) ambientOpacityToggles += 1;
    if (whyCv !== lastWhyCv && lastWhyCv) whyCvToggles += 1;
    if (scrollAttr !== lastScrollAttr && lastScrollAttr) scrollAttrToggles += 1;
    lastAmbient = ambientOp ?? "";
    lastWhyCv = whyCv ?? "";
    lastScrollAttr = scrollAttr;

    samples.push({
      y: Math.round(y),
      gapPx: catalogRect && whyRect ? Math.round(whyRect.top - catalogRect.bottom) : null,
      ambientOpacity: ambientOp,
      whyCv,
      scrollAttr: scrollAttr || "off",
      catalogSeamAnim: catalogSeam,
      whySeamAnim: whySeam,
      catalogBg: catalog ? getComputedStyle(catalog).backgroundColor : null,
      whyBg: whyUs ? getComputedStyle(whyUs).backgroundColor : null,
    });
  }

  return {
    ambientOpacityToggles,
    whyCvToggles,
    scrollAttrToggles,
    whyDeferred: whyUs?.classList.contains("landing-section-deferred"),
    catalogContained: catalog?.classList.contains("landing-section-contained"),
    samples: samples.filter((_, i) => i % 2 === 0 || i === samples.length - 1),
  };
});

const line = JSON.stringify({
  sessionId: "1a1cfd",
  runId: "playwright-seam-audit",
  hypothesisId: "summary",
  location: "scripts/debug-catalog-whyus-seam.mjs",
  message: "catalog-whyus-boundary-audit",
  data: { url: URL, audit },
  timestamp: Date.now(),
});
fs.appendFileSync(LOG, line + "\n");
console.log(JSON.stringify(audit, null, 2));

await browser.close();
