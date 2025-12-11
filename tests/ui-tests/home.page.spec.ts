import { test, expect } from "@playwright/test"
import { HomePage } from "../../pages/home.page"



test.beforeEach(()=>{
test.info().annotations.push({

    type:"Start",
    description: new Date().toISOString(),
})

});
test('Verify app logo text @UI', async ({ page }) => {
    const homePage = new HomePage(page);
    const BASE_URL = process.env.BASE_URL as string;

    await page.goto(BASE_URL);
    await page.waitForTimeout(6000);
    const logoText = await homePage.getAppLogoText();
    console.log(logoText);  // "Swag Labs"
    expect(logoText).toBe('Swag Labs');
});


test.afterEach(()=>{
test.info().annotations.push({

    type:"End",
    description: new Date().toISOString(),
})

});
