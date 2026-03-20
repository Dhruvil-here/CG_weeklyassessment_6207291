import { test } from "@playwright/test";

test("icc ranks", async ({ page }) => {

    await page.goto('https://www.icc-cricket.com/rankings/womens/player-rankings/odi/batting', {
        waitUntil: 'networkidle',
        timeout: 60000
    });

    await page.waitForLoadState('networkidle');

    const rows = page.locator('tbody tr');

    const count = await rows.count();

    for (let i = 0; i < count; i++) {
        const name = await rows.nth(i).locator('td').nth(1).textContent();

        if (name?.includes('Mandhana')) {
            const rank = await rows.nth(i).locator('td').nth(0).textContent();
            console.log("Smriti Mandhana rank:", rank?.trim());
            break;
        }
    }

    await page.screenshot({ path: "Screenshot/day13.task1.png", fullPage: true });

});