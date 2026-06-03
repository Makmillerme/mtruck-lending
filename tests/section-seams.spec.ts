import { test, expect } from "@playwright/test";

const seamSections = ["#home", "#about", "#services", "#catalog", "#why-us", "#faq"];
const fullWidthSeams = new Set(["#home", "#faq"]);

test.describe("Section seam accents", () => {
  test.beforeEach(({ }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome", "layout checks on desktop");
  });

  test("each section has one bottom seam pseudo with taper and sweep animation", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const viewportWidth = page.viewportSize()?.width ?? 1280;

    for (const selector of seamSections) {
      const seam = await page.evaluate((sectionSelector) => {
        const section = document.querySelector(sectionSelector) as HTMLElement | null;
        if (!section) return null;

        const beforeStyle = getComputedStyle(section, "::before");
        const afterStyle = getComputedStyle(section, "::after");

        return {
          beforeContent: beforeStyle.content,
          afterContent: afterStyle.content,
          bottom: beforeStyle.bottom,
          maskImage: beforeStyle.maskImage || beforeStyle.webkitMaskImage,
          animationName: beforeStyle.animationName,
          width: beforeStyle.width,
          height: beforeStyle.height,
          hasClass: section.classList.contains("section-seam-accent"),
        };
      }, selector);

      expect(seam, `${selector} missing`).not.toBeNull();
      expect(seam!.hasClass).toBe(true);
      expect(seam!.beforeContent).not.toBe("none");
      /* ::after may hold section glow bleed (about/services/catalog) */
      if (seam!.afterContent !== "none" && seam!.afterContent !== "") {
        const afterBottom = await page.evaluate((sectionSelector) => {
          const section = document.querySelector(sectionSelector) as HTMLElement | null;
          return section ? getComputedStyle(section, "::after").bottom : null;
        }, selector);
        expect(afterBottom).not.toBe("0px");
      }
      expect(seam!.bottom).toBe("0px");
      expect(seam!.animationName).toBe("seamGlowSweep");
      expect(parseFloat(seam!.height)).toBeLessThanOrEqual(3);

      if (fullWidthSeams.has(selector)) {
        expect(seam!.maskImage).toContain("radial-gradient");
        expect(parseFloat(seam!.width)).toBeGreaterThanOrEqual(viewportWidth - 2);
      } else {
        expect(seam!.maskImage).toContain("radial-gradient");
      }
    }
  });

  test("footer has no seam accent (last section)", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const footerSeam = await page.evaluate(() => {
      const footer = document.querySelector("footer#contact") as HTMLElement | null;
      if (!footer) return { missing: true };
      return {
        hasClass: footer.classList.contains("section-seam-accent"),
        beforeContent: getComputedStyle(footer, "::before").content,
      };
    });

    expect(footerSeam.hasClass).toBe(false);
    expect(footerSeam.beforeContent).toBe("none");
  });
});
