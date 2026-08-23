import { Locator, Page } from '@playwright/test';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';

export class AccountsOverviewPage {
    public readonly page: Page;
    private readonly accountsTable: Locator;
    private readonly accountLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountsTable = page.locator('#accountTable');
        this.accountLinks = page.getByRole('link', { name: 'Accounts Overview' });
    }

    async navigate() {
        await this.page.goto(ParabankUtils.buildUrl(Endpoints.OVERVIEW));
        await this.page.waitForURL(ParabankUtils.buildUrl(Endpoints.OVERVIEW));
    }

    async getAccountNumbers(): Promise<string[]> {
        await this.page.waitForSelector('#accountTable tbody tr a', { state: 'visible' });
        const rows = await this.page.locator('#accountTable tbody tr a').allTextContents();
        return rows;
    }

    async getAccountSum(): Promise<string> {
        await this.page.waitForSelector('#accountTable tbody tr b', { state: 'visible' });
        const total = await this.page.locator('#accountTable tbody tr b').allTextContents();
        return total[1].slice(1);
    }

    async clickOnAccountLink() {
        await this.accountLinks.click();
        await this.waitForAccountsPageToLoad();
    }

    async waitForAccountsPageToLoad() {
        await this.page.waitForURL(/.*overview*.htm/);
        await this.accountsTable.waitFor({ state: 'visible', timeout: 5000 });
    }

    getPage(): Page {
        return this.page;
    }

}