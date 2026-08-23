import { Locator, Page } from '@playwright/test';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';

export class ActivityPage {
    public readonly page: Page;
    private readonly accountBalance: Locator;


    constructor(page: Page) {
        this.page = page;
        this.accountBalance = this.page.locator('tr:has-text("Balance:") td').last();
    }

    async navigate(accountNo: string) {
        await this.page.goto(ParabankUtils.buildUrl(Endpoints.ACTIVITY) + accountNo);
    }

    async getBalanceAmount() {
        const text = await this.accountBalance.innerText();
        return text.replace('$', '').trim();
    }
}
