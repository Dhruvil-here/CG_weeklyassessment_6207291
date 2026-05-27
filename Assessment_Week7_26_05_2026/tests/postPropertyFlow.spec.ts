import { test, expect } from '@playwright/test';
import postData from '../test-data/postPropertyData.json';
import { captureScreenshot } from '../utils/screenshotHelper';

test('Post Property Flow @smoke', async ({ page }) => {
    await page.goto('https://www.nobroker.in', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    await captureScreenshot(page, 'postproperty-homepage');
    console.log(postData.ownerName);
    await page.locator('button').filter({ hasText: /Post/i }).first().click();
    await captureScreenshot(page, 'postproperty-clicked');
    await expect(page.locator('body')).toBeVisible();

});