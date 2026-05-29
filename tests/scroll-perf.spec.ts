import { test, expect } from "@playwright/test";

const IGNORED_CONSOLE_PATTERNS = [
  /Failed to load resource.*favicon/i,
  /preload.*not used within a few seconds/i,
];

function isIgnoredConsoleError(text: string) {
  return IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
}

test.describe("Landing scroll performance", () => {
  test("scrolls hero to footer without runtime errors", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error" && !isIgnoredConsoleError(message.text())) {
        errors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#home");

    await page.evaluate(async () => {
      const step = Math.max(240, Math.floor(window.innerHeight * 0.55));
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      for (let y = 0; y <= maxScroll; y += step) {
        window.scrollTo({ top: y, behavior: "auto" });
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    });

    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#catalog")).toBeVisible();
    await expect(page.locator("#faq")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    expect(errors, `Console errors during scroll:\n${errors.join("\n")}`).toEqual([]);
  });

  test("services and catalog stay stable during scroll", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const contentVisibility = await page.evaluate(() => {
      const services = document.getElementById("services");
      const catalog = document.getElementById("catalog");
      if (!services || !catalog) return { services: "", catalog: "" };

      return {
        services: getComputedStyle(services).contentVisibility,
        catalog: getComputedStyle(catalog).contentVisibility,
      };
    });

    expect(contentVisibility.services).not.toBe("auto");
    expect(contentVisibility.catalog).not.toBe("auto");

    await page.evaluate(async () => {
      const targets = ["services", "catalog"] as const;

      for (const id of targets) {
        document.getElementById(id)?.scrollIntoView({ block: "center", behavior: "auto" });
        await new Promise((resolve) => setTimeout(resolve, 150));

        for (let step = 0; step < 6; step += 1) {
          window.scrollBy({ top: 120, behavior: "auto" });
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
      }
    });

    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#catalog")).toBeVisible();

    const marqueePausedOffscreen = await page.evaluate(() => {
      const catalog = document.getElementById("catalog");
      const track = catalog?.querySelector(".catalog-brand-marquee-track");
      if (!catalog || !track) return true;

      const rect = catalog.getBoundingClientRect();
      const offscreen = rect.bottom < 0 || rect.top > window.innerHeight;
      if (!offscreen) return true;

      return getComputedStyle(track).animationPlayState === "paused";
    });

    expect(marqueePausedOffscreen).toBe(true);
  });

  test("hero assets are optimized and about section is reachable", async ({ page, request }) => {
    await page.goto("/");

    const heroMobile = await request.get("/images/hero-road-bg-mobile.webp");
    expect(heroMobile.status()).toBe(200);
    expect(Number(heroMobile.headers()["content-length"] ?? 0)).toBeLessThan(512_000);

    await page.evaluate(() => {
      document.getElementById("about")?.scrollIntoView({ block: "start", behavior: "auto" });
    });

    await expect(page.locator("#about")).toBeInViewport({ ratio: 0.15 });
  });
});

test.describe("Landing mobile UI polish", () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chrome", "mobile-only checks");
  });

  test("header and section containers share horizontal padding", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const padding = await page.evaluate(() => {
      const headerContainer = document.querySelector("header .landing-page-container");
      const aboutContainer = document.querySelector("#about .landing-page-container");
      if (!headerContainer || !aboutContainer) {
        return { header: null, about: null };
      }

      const headerStyle = getComputedStyle(headerContainer);
      const aboutStyle = getComputedStyle(aboutContainer);

      return {
        header: headerStyle.paddingInline,
        about: aboutStyle.paddingInline,
      };
    });

    expect(padding.header).toBeTruthy();
    expect(padding.about).toBeTruthy();
    expect(padding.header).toBe(padding.about);
  });

  test("hero CTAs share equal width", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const widths = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll("#home .hero-cta-row .landing-btn"),
      ) as HTMLElement[];

      return buttons.map((button) => Math.round(button.getBoundingClientRect().width));
    });

    expect(widths.length).toBeGreaterThanOrEqual(2);
    expect(widths[0]).toBe(widths[1]);
  });

  test("catalog cards fit within viewport padding", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.evaluate(() => {
      document.getElementById("catalog")?.scrollIntoView({ block: "center", behavior: "auto" });
    });

    await page.waitForSelector("#catalog .catalog-cards-track--scroll");

    await page.evaluate(() => {
      const track = document.querySelector("#catalog .catalog-cards-track");
      if (track instanceof HTMLElement) {
        track.scrollLeft = 0;
      }
    });

    const firstCard = page.locator("#catalog .catalog-cards-track .catalog-brand-card").first();
    await expect(firstCard).toBeVisible();

    const fits = await page.evaluate(() => {
      const card = document.querySelector(
        "#catalog .catalog-cards-track .catalog-brand-card",
      ) as HTMLElement | null;
      const container = document.querySelector("#catalog .landing-page-container") as HTMLElement | null;
      if (!card || !container) return false;

      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle(container);
      const padLeft = parseFloat(containerStyle.paddingLeft);
      const padRight = parseFloat(containerStyle.paddingRight);
      const innerLeft = containerRect.left + padLeft;
      const innerRight = containerRect.right - padRight;
      const innerWidth = innerRight - innerLeft;

      return (
        cardRect.left >= innerLeft - 1 &&
        cardRect.right <= innerRight + 1 &&
        cardRect.width <= innerWidth + 1
      );
    });

    expect(fits).toBe(true);
  });

  test("catalog cards stay scrollable after page reload", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.reload({ waitUntil: "domcontentloaded" });

    await page.evaluate(() => {
      document.getElementById("catalog")?.scrollIntoView({ block: "center", behavior: "auto" });
    });

    await page.waitForSelector("#catalog .catalog-cards-track--scroll");

    await page.waitForFunction(() => {
      const track = document.querySelector("#catalog .catalog-cards-track") as HTMLElement | null;
      return Boolean(track && track.scrollWidth > track.clientWidth + 2);
    });

    const nextButton = page.locator('#catalog button[aria-label="Next brands"]:not([disabled])');
    await expect(nextButton).toBeVisible();

    const beforeScroll = await page.evaluate(() => {
      const track = document.querySelector("#catalog .catalog-cards-track") as HTMLElement | null;
      return track?.scrollLeft ?? 0;
    });

    await nextButton.click();

    await page.waitForFunction(
      (start) => {
        const track = document.querySelector("#catalog .catalog-cards-track") as HTMLElement | null;
        return Boolean(track && track.scrollLeft > (start as number) + 2);
      },
      beforeScroll,
    );
  });

  test("catalog brand marquee animates when in view on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.evaluate(() => {
      document.getElementById("catalog")?.scrollIntoView({ block: "start", behavior: "auto" });
    });

    await expect(page.locator("#catalog .catalog-brand-marquee-track")).toBeVisible();

    const animation = await page.evaluate(() => {
      const track = document.querySelector("#catalog .catalog-brand-marquee-track");
      if (!track) return { name: "none", duration: "0s" };

      const style = getComputedStyle(track);
      return {
        name: style.animationName,
        duration: style.animationDuration,
      };
    });

    expect(animation.name).not.toBe("none");
    expect(parseFloat(animation.duration)).toBeGreaterThan(0);
  });
});
