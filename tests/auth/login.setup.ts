import { test as setup, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const authFile = 'tests/storage-set/.auth/user.json';
const {BASE_URL,USER_NAME,PASSWORD} = process.env;
  const base_url = process.env.BASE_URL as string;

setup('save authenticated state @Login', async ({ page }) => {
  // Navigate to the Sauce Demo login page
  await page.goto(base_url);

  // Fill in the demo credentials
  await page.locator('#user-name').fill(USER_NAME!);
  await page.locator('#password').fill(PASSWORD!);
  await page.locator('#login-button').click();

  // Verify successful login by checking presence of inventory container
  await expect(page.locator('.inventory_list')).toBeVisible();

  // Ensure directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Save storage state
  await page.context().storageState({ path: authFile });
});