/**
 * WebKit visual audit — oklch support + hero/catalog computed colors.
 * Usage: node scripts/debug-webkit-visual.mjs [url]
 * Log: debug-1a1cfd.log (append)
 */
import { webkit, devices } from "playwright";
import fs from "node:fs";

const URL = process.argv[2] || process.env.DEBUG_URL || "http://localhost:3000/";
const LOG = "debug-1a1cfd.log";

const browser = await webkit.launch();
const context = await browser.newContext({ ...devices["iPhone 13"] });
const page = await context.newPage();
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForSelector("#home", { timeout: 45_000 });

const snapshot = await page.evaluate(() => {
  const oklchProbe = document.createElement("div");
  oklchProbe.style.color = "oklch(0.5 0.1 250)";
  document.body.appendChild(oklchProbe);
  const oklchSupported = getComputedStyle(oklchProbe).color !== "";
  oklchProbe.remove();

  const body = getComputedStyle(document.body);
  const landing = document.querySelector(".landing-bg");
  const highlight = document.querySelector("#home .chrome-gradient");
  const heroImg = document.querySelector("#home .hero-bg-image");
  const catalog = document.getElementById("catalog");

  return {
    oklchSupported,
    bodyBackground: body.backgroundColor,
    landingBackground: landing ? getComputedStyle(landing).backgroundColor : null,
    chromeGradient: highlight
      ? {
          color: getComputedStyle(highlight).color,
          webkitTextFillColor: getComputedStyle(highlight).getPropertyValue(
            "-webkit-text-fill-color",
          ),
          backgroundClip: getComputedStyle(highlight).backgroundClip,
        }
      : null,
    heroNaturalWidth: heroImg instanceof HTMLImageElement ? heroImg.naturalWidth : 0,
    catalogBackground: catalog ? getComputedStyle(catalog).backgroundColor : null,
    userAgent: navigator.userAgent,
  };
});

const line = JSON.stringify({
  ts: new Date().toISOString(),
  kind: "webkit-visual-audit",
  url: URL,
  ...snapshot,
});
fs.appendFileSync(LOG, line + "\n");
console.log(line);

await browser.close();
