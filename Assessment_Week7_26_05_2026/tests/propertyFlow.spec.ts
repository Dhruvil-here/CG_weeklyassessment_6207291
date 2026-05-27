import { test, expect } from '@playwright/test';
import propertyData from '../test-data/propertyData.json';
import { captureScreenshot } from '../utils/screenshotHelper';

test('Property Details Flow @regression', async ({ page }) => {
    await page.goto('https://www.nobroker.in', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    await captureScreenshot(page, 'property-homepage');
    console.log(propertyData.city);
    await expect(page).toHaveTitle(/Without Brokerage/i);
    await expect(page.locator('body')).toBeVisible();
});