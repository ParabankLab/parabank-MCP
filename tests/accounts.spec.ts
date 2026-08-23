import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { HomePage } from '../pages/HomePage';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';
import { AdminPage } from '../pages/AdminPage';
import { test, expect } from '../fixtures/baseTest';

let homePage: HomePage;
let accountsOverviewPage: AccountsOverviewPage;

test.beforeEach('Open url', async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.page.goto(ParabankUtils.buildUrl(Endpoints.ADMIN));
    accountsOverviewPage = new AccountsOverviewPage(page);
    await new AdminPage(page).initDb();
    await accountsOverviewPage.clickOnAccountLink();
});


test.describe('Accounts Overview', () => {

    test('TC-ACCOUNTS-01 - should display correct number of accounts in accounts overview', async ({ testData }) => {
        // Assert
        await expect(homePage['page']).toHaveURL(/.*overview*.htm/);
        expect(await accountsOverviewPage.getAccountNumbers()).toHaveLength(testData.accounts.length);
    });

    test('TC-ACCOUNTS-02 - should display correct account numbers in accounts overview', async ({ testData }) => {
        // Act
        const actualAccountNumbers = await accountsOverviewPage.getAccountNumbers();
        // Assert
        expect(actualAccountNumbers.join(",")).toContain(testData.accounts.toString());
    });
});

