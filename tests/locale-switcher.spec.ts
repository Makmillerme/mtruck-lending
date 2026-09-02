import { test, expect } from "@playwright/test";

async function openLanguageMenu(page: import("@playwright/test").Page) {
  await page.locator(".landing-header-locale-btn").click();
  await page.getByRole("menuitem").first().waitFor({ state: "visible" });
}

async function selectLanguage(page: import("@playwright/test").Page, label: string) {
  await openLanguageMenu(page);
  await page.getByRole("menuitem", { name: label }).click();
}

test.describe("Locale switcher", () => {
  test("defaults to English on first visit at root URL", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("en");
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("shows four public languages in the header switcher", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openLanguageMenu(page);

    await expect(page.getByRole("menuitem", { name: "English" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Slovenčina" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Deutsch" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Polski" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Українська" })).toHaveCount(0);
  });

  test("switching to German updates URL, html lang, nav label, and cookie", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await selectLanguage(page, "Deutsch");

    await expect(page).toHaveURL("http://localhost:3000/de");
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("de");
    await expect(page.locator(".landing-header-nav button").first()).toHaveText("Start");

    const cookies = await page.context().cookies();
    expect(cookies.find((cookie) => cookie.name === "locale")?.value).toBe("de");
  });

  test("switching to Polish updates URL, hero copy, and cookie", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await selectLanguage(page, "Polski");

    await expect(page).toHaveURL("http://localhost:3000/pl");
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("pl");
    await expect(page.locator("#home .hero-copy-panel")).toContainText("Europejska jakość");

    const cookies = await page.context().cookies();
    expect(cookies.find((cookie) => cookie.name === "locale")?.value).toBe("pl");
  });

  test("direct visit to /sk shows Slovak content", async ({ page }) => {
    await page.goto("/sk", { waitUntil: "domcontentloaded" });
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("sk");
    await expect(page.locator(".landing-header-nav button").first()).toHaveText("Domov");
    await expect(page).toHaveURL("http://localhost:3000/sk");
  });

  test("/en redirects to root URL", async ({ page }) => {
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("en");
  });

  test("keeps scroll position when switching language", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    await page.evaluate(() => {
      document.getElementById("catalog")?.scrollIntoView({ block: "center", behavior: "auto" });
    });
    await page.waitForFunction(() => window.scrollY > 200);

    const beforeY = await page.evaluate(() => window.scrollY);

    await selectLanguage(page, "Deutsch");
    await expect(page).toHaveURL("http://localhost:3000/de");
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("de");

    await expect
      .poll(async () => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(beforeY - 80);
  });

  test("legacy uk cookie does not override English root URL", async ({ page }) => {
    await page.context().addCookies([{ name: "locale", value: "uk", domain: "localhost", path: "/" }]);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("en");
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
