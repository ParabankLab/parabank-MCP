import { test as setup } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ParabankUtils } from '../utils/ParabankUtils';
import path from 'path';
import fs from 'fs';

const loginData = ParabankUtils.getTestData();
const authDir = path.join(__dirname, '../playwright/.auth');
const authFile = path.join(authDir, 'user.json');

setup('authenticate', async ({ page }) => {
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    let homePage: HomePage = new HomePage(page);
    await homePage.navigate();
    await homePage.login(loginData.user[0].name, loginData.user[0].password);
    await page.waitForURL(/.*overview.htm/);
    await page.context().storageState({ path: authFile });
});