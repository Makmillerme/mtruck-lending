import { test, expect } from "@playwright/test";

async function openHeaderCta(page: import("@playwright/test").Page) {
  const headerCta = page.locator(".landing-header-cta").first();
  if (await headerCta.isVisible()) {
    await headerCta.click();
  } else {
    const mobileToggle = page.getByLabel("Toggle menu");
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
      await page.locator(".landing-header-mobile-cta").getByRole("button").click();
    } else {
      await page
        .locator("#home .hero-cta-row")
        .getByRole("button", { name: /Odoslať dopyt|Send a request|Wyślij zapytanie|Anfrage senden/i })
        .click();
    }
  }

  await expect(page.getByRole("dialog")).toBeVisible();
}

test.describe("CTA contact form", () => {
  test("submits with email and without phone", async ({ page }) => {
    await page.route("**/api/contact-request", async (route) => {
      const body = route.request().postDataJSON() as Record<string, string>;
      expect(body.email).toMatch(/@/);
      expect(body.phone).toBe("");
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openHeaderCta(page);
    await page.getByLabel(/Meno|Name|Imię/i).fill("Test User");
    await page.getByLabel(/Email|E-mail/i).fill("test@example.com");
    await page.getByLabel(/Detaily|Request details|Szczegóły/i).fill("Test message for CTA form");
    await page.getByRole("button", { name: /Odoslať|Send request|Wyślij/i }).click();
    await expect(page.getByText(/úspešne|successfully|wysłane/i)).toBeVisible({ timeout: 5000 });
  });

  test("blocks submit without email", async ({ page }) => {
    let submitted = false;
    await page.route("**/api/contact-request", async (route) => {
      submitted = true;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await openHeaderCta(page);
    await page.getByLabel(/Meno|Name|Imię/i).fill("Test User");
    await page.getByLabel(/Detaily|Request details|Szczegóły/i).fill("No email provided");
    await page.getByRole("button", { name: /Odoslať|Send request|Wyślij/i }).click();
    expect(submitted).toBe(false);
  });
});
