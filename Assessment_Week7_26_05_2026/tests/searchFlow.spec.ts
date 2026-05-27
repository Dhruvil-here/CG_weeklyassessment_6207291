import { test, expect } from '@playwright/test';
import searchData from '../test-data/searchData.json';
import { captureScreenshot } from '../utils/screenshotHelper';

test('Property Search Flow @smoke', async ({ page }) => {
    await page.goto('https://www.nobroker.in', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    await captureScreenshot(page, 'homepage');
    console.log(searchData.city);
    await expect(page).toHaveTitle(/Without Brokerage/i);
});