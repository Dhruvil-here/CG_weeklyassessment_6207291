import { test, expect } from "@playwright/test";

test("Task 4 - Olympics Medal Count", async ({ page }) => {

    await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020");
    await page.locator('#onetrust-accept-btn-handler').click();
    await page.getByText('Medal Table').click();
    await page.waitForSelector('[data-cy="medal-main"]');
    const medals = await page.locator('[data-cy="medal-main"]').allTextContents();

    console.log("Medals:", medals);

    console.log("Third medal:", medals[2]);

    await page.screenshot({ path: "screenshot/day11.task4.png", fullPage: true });

});