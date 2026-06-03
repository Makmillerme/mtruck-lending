import { test, expect } from "@playwright/test";

test.describe("Desktop layout regression", () => {
  test("header nav, hero width, and catalog row layout stay intact", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator(".landing-header-nav")).toBeVisible();
    await expect(page.locator("#home .hero-copy-panel")).toBeVisible();

    await page.evaluate(() => {
      window.scrollTo({ top: 900, behavior: "auto" });
    });

    const headerStaysOnTop = await page.evaluate(() => {
      const header = document.querySelector(".landing-site-header") as HTMLElement | null;
      if (!header) return false;

      const rect = header.getBoundingClientRect();
      const sampleY = Math.min(rect.bottom - 4, rect.top + rect.height / 2);
      const topElement = document.elementFromPoint(window.innerWidth / 2, sampleY);

      return Boolean(topElement && header.contains(topElement));
    });

    expect(headerStaysOnTop).toBe(true);

    const heroMaxWidth = await page.evaluate(() => {
      const panel = document.querySelector("#home .hero-copy-panel") as HTMLElement | null;
      return panel ? parseFloat(getComputedStyle(panel).maxWidth) : 0;
    });
    expect(heroMaxWidth).toBeGreaterThanOrEqual(560);
    expect(heroMaxWidth).toBeLessThanOrEqual(580);

    await page.evaluate(() => {
      document.getElementById("catalog")?.scrollIntoView({ block: "center", behavior: "auto" });
    });

    const catalogHeadAlign = await page.evaluate(() => {
      const head = document.querySelector("#catalog .catalog-section-head") as HTMLElement | null;
      return head ? getComputedStyle(head).textAlign : "";
    });
    expect(catalogHeadAlign).toBe("left");

    const catalogHeaderDirection = await page.evaluate(() => {
      const block = document.querySelector("#catalog .catalog-header-block") as HTMLElement | null;
      return block ? getComputedStyle(block).flexDirection : "";
    });
    expect(catalogHeaderDirection).toBe("row");
  });

  test("about desktop callouts stay visible and services use wide pipeline", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.evaluate(() => {
      document.getElementById("about")?.scrollIntoView({ block: "center", behavior: "auto" });
    });

    await expect(page.locator("#about .about-callouts-overlay")).toBeVisible();

    await page.evaluate(() => {
      document.getElementById("services")?.scrollIntoView({ block: "center", behavior: "auto" });
    });

    const pipelineLayout = await page.evaluate(() => {
      const pipeline = document.querySelector("#services .services-pipeline") as HTMLElement | null;
      if (!pipeline) return { display: "", stepCount: 0 };
      return {
        display: getComputedStyle(pipeline).display,
        stepCount: pipeline.querySelectorAll(".services-pipeline-step").length,
      };
    });
    expect(pipelineLayout.display).toBe("flex");
    expect(pipelineLayout.stepCount).toBeGreaterThanOrEqual(4);
  });

  test("mobile menu toggle hidden at desktop nav breakpoint (1024px)", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator(".landing-header-nav")).toBeVisible();
    await expect(page.locator(".landing-header-icon-toggle")).toBeHidden();
  });

  test("mobile menu toggle visible below desktop nav breakpoint (1023px)", async ({ page }) => {
    await page.setViewportSize({ width: 1023, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator(".landing-header-nav")).toBeHidden();
    await expect(page.locator(".landing-header-icon-toggle")).toBeVisible();
  });

  for (const { label, firstNav } of [
    { label: "Українська", firstNav: "Головна" },
    { label: "Deutsch", firstNav: "Start" },
    { label: "Slovenčina", firstNav: "Domov" },
  ]) {
    test(`header nav stays on one line for ${label} at 1024px`, async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 800 });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const trigger = page.locator(".landing-header-actions button").filter({ has: page.locator("svg") }).first();
      await trigger.click();
      await page.getByRole("menuitem", { name: label }).click();

      await expect(page.locator(".landing-header-nav button").first()).toHaveText(firstNav);

      const navLayout = await page.evaluate(() => {
        const nav = document.querySelector(".landing-header-nav") as HTMLElement | null;
        if (!nav) return { wrap: "", lineCount: 0, fontSize: 0 };

        const links = Array.from(nav.querySelectorAll(".landing-header-nav-link")) as HTMLElement[];
        const tops = links.map((link) => Math.round(link.getBoundingClientRect().top));
        const firstLink = links[0];

        return {
          wrap: getComputedStyle(nav).flexWrap,
          lineCount: new Set(tops).size,
          fontSize: firstLink ? parseFloat(getComputedStyle(firstLink).fontSize) : 0,
        };
      });

      expect(navLayout.wrap).toBe("nowrap");
      expect(navLayout.lineCount).toBe(1);
      expect(navLayout.fontSize).toBeGreaterThanOrEqual(9);
      expect(navLayout.fontSize).toBeLessThanOrEqual(14);
    });
  }

  test("footer desktop grid keeps four columns", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.evaluate(() => {
      document.getElementById("contact")?.scrollIntoView({ block: "start", behavior: "auto" });
    });

    const gridAreas = await page.evaluate(() => {
      const grid = document.querySelector("footer#contact .footer-main-grid") as HTMLElement | null;
      return grid ? getComputedStyle(grid).gridTemplateAreas : "";
    });
    expect(gridAreas).toContain("brand");
    expect(gridAreas).toContain("links");
    expect(gridAreas).toContain("services");
  });
});
