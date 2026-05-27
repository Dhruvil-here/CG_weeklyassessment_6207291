import { test, expect } from '@playwright/test';
import loginData from '../test-data/loginData.json';
import { captureScreenshot } from '../utils/screenshotHelper';

test('Login Flow @regression', async ({ page }) => {

    await page.goto('https://www.nobroker.in', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    await captureScreenshot(page, 'login-homepage');
    await page.locator('#navHeader').getByText('Log in').click();
    await captureScreenshot(page, 'login-popup');
    console.log(loginData.mobile);
    await expect(page.locator('input[type="tel"]')).toBeVisible();
});