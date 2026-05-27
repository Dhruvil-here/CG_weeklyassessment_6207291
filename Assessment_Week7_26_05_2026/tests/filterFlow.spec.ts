import { test, expect } from '@playwright/test';
import filterData from '../test-data/filterData.json';
import { captureScreenshot } from '../utils/screenshotHelper';

test('Filter Flow @smoke', async ({ page }) => {
    await page.goto('https://www.nobroker.in', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    await captureScreenshot(page, 'filter-homepage');
    console.log(filterData.budget);
    await page.locator('div').filter({ hasText: /^Rent$/ }).first().click();
    await captureScreenshot(page, 'rent-clicked');
    await expect(page.locator('text=World\'s Largest NoBrokerage Property Site')).toBeVisible();
});