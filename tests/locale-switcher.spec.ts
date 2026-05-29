import { test, expect } from "@playwright/test";

async function openLanguageMenu(page: import("@playwright/test").Page) {
  const trigger = page.locator(".landing-header-actions button").filter({ has: page.locator("svg") }).first();
  await trigger.click();
}

async function selectLanguage(page: import("@playwright/test").Page, label: string) {
  await openLanguageMenu(page);
  await page.getByRole("menuitem", { name: label }).click();
}

test.describe("Locale switcher", () => {
  test("shows four languages in the header switcher", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openLanguageMenu(page);

    await expect(page.getByRole("menuitem", { name: "English" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Українська" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Slovenčina" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Deutsch" })).toBeVisible();
  });

  test("switching to German updates html lang, nav label, and cookie", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await selectLanguage(page, "Deutsch");

    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("de");
    await expect(page.locator(".landing-header-nav button").first()).toHaveText("Start");

    const cookies = await page.context().cookies();
    expect(cookies.find((cookie) => cookie.name === "locale")?.value).toBe("de");
  });

  test("switching to Slovak updates hero copy and cookie", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await selectLanguage(page, "Slovenčina");

    await expect.poll(async () => page.evaluate(() => document.documentElement.lang)).toBe("sk");
    await expect(page.locator("#home .hero-copy-panel")).toContainText("Európska kvalita");

    const cookies = await page.context().cookies();
    expect(cookies.find((cookie) => cookie.name === "locale")?.value).toBe("sk");
  });
});
