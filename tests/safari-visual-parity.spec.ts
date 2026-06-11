import { test, expect } from "@playwright/test";

function parseRgbAlpha(color: string): number {
  const m = color.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (!m) return 1;
  const a = m[4] !== undefined ? Number(m[4]) : 1;
  return Number.isFinite(a) ? a : 1;
}

test.describe("Safari / WebKit visual parity", () => {
  test("hero image and copy are visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#home");

    const heroImg = page.locator("#home .hero-bg-image");
    await expect(heroImg).toBeVisible();

    const naturalWidth = await heroImg.evaluate((img) =>
      img instanceof HTMLImageElement ? img.naturalWidth : 0,
    );
    expect(naturalWidth, "hero image should decode").toBeGreaterThan(0);

    await expect(page.locator("#home h1").first()).toBeVisible();
  });

  test(".chrome-gradient accent text stays readable without background box", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    for (const selector of ["#home", "#about", "#services"]) {
      const highlight = page.locator(`${selector} .chrome-gradient`).first();
      await expect(highlight, `${selector} accent`).toBeVisible();

      const text = (await highlight.textContent())?.trim();
      expect(text?.length, `${selector} accent text`).toBeGreaterThan(0);

      const styles = await highlight.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          color: cs.color,
          webkitTextFillColor: cs.getPropertyValue("-webkit-text-fill-color"),
          backgroundClip: cs.backgroundClip,
          backgroundImage: cs.backgroundImage,
        };
      });

      const fillAlpha = parseRgbAlpha(styles.webkitTextFillColor || styles.color);
      const colorAlpha = parseRgbAlpha(styles.color);
      const hasVisibleFill = fillAlpha > 0.15 || colorAlpha > 0.15;
      expect(hasVisibleFill, `${selector} gradient text invisible: ${JSON.stringify(styles)}`).toBe(
        true,
      );
      expect(
        styles.backgroundImage,
        `${selector}: touch devices must not paint an unclipped gradient box behind accent text`,
      ).toBe("none");
    }
  });

  test("body uses a non-transparent landing background", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".landing-bg");

    const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bodyBg).not.toBe("rgba(0, 0, 0, 0)");

    const landingBg = await page.evaluate(() => {
      const el = document.querySelector(".landing-bg");
      if (!el) return "";
      return getComputedStyle(el).backgroundColor;
    });
    expect(landingBg).not.toBe("rgba(0, 0, 0, 0)");
  });
});
