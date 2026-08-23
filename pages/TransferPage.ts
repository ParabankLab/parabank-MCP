import { Locator, Page, expect } from '@playwright/test';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';

export class TransferPage {
    public readonly page: Page;
    private readonly amountInput: Locator;
    private readonly fromAccountIdSelect: Locator;
    private readonly toAccountIdSelect: Locator;
    private readonly transferButton: Locator;
    private readonly transferConfirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = page.locator('#amount');
        this.fromAccountIdSelect = page.locator('#fromAccountId');
        this.toAccountIdSelect = page.locator('#toAccountId');
        this.transferButton = page.locator('input[value="Transfer"]');
        this.transferConfirmationMessage = page.locator('#showResult h1');
    }

    async navigate() {
        await this.page.goto(ParabankUtils.buildUrl(Endpoints.TRANSFER));
    }

    async clickOnTransferButton() {
        await this.transferButton.click();
    }

    async fillTransferAmount(amount: string) {
        await expect(this.amountInput).toBeVisible();
        await this.amountInput.fill(amount);
    }

    async selectFromAccountId(accountId: string) {
        await expect(this.fromAccountIdSelect).toBeVisible();
        await this.fromAccountIdSelect.selectOption(accountId);
    }

    async selectToAccountId(accountId: string) {
        await this.toAccountIdSelect.selectOption(accountId);
    }

    getTransferConfirmationMessage() {
        return this.transferConfirmationMessage;
    }
}
