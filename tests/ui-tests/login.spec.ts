
import { test, expect } from '@playwright/test';

//const STORAGE_STATE_PATH = 'tests/storage-set/.auth/user.json';

 //test.use({ storageState: STORAGE_STATE_PATH }); // Use saved session

 const baseURL = process.env.BASE_URL as string;
test('User should be able to log out from the inventory page@Login', async ({ page }) => {
  // Page starts already logged in
  await page.goto(baseURL);
  console.log("User launches the app successfully and logged in")

  // Open menu and click logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  console.log("user verifies the side bar and clicks on logout button")

  // Verify successful logout by checking login button
  await expect(page.locator('#login-button')).toBeVisible();
  
});