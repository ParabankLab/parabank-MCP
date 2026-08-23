import { Locator, Page, expect } from '@playwright/test';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';

export class AdminPage {
    public readonly page: Page;
    private readonly initializeDbButton: Locator;
    private readonly adminLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.initializeDbButton = page.getByRole('button', { name: 'Initialize' });
        this.adminLink = page.getByRole('link', { name: 'Admin Page' });
    }

    async navigate() {
        await this.page.goto(ParabankUtils.buildUrl(Endpoints.ADMIN));
        await expect(this.page).toHaveURL(/.*admin*.htm/);
    }

    async clickOnAdminLink() {
        await this.adminLink.click();
    }

    async initDatabase() {
        await this.initializeDbButton.waitFor({ state: 'visible' });
        await this.initializeDbButton.click();
    }

    async initDb(){
        await this.navigate();
        await this.initDatabase();
    }
}