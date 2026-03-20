import {test} from "@playwright/test"

test("Task 3",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
    await page.locator('//input[@id="name"]').fill("Prince@2004");
    await page.locator('//input[@id="email"]').fill("princeverma55080@gmail.com");
    await page.locator('//input[@id="password"]').fill("Prince@2004");
    await page.locator('button[type="submit"]').click();
    await page.locator('//input[@id="email"]').fill("princeverma55080@gmail.com");
    await page.locator('//input[@id="password"]').fill("Prince@2004");
    await page.locator('button[type="submit"]').click();
    await page.screenshot({ path:'screenshot/day11.task3.png'});

});