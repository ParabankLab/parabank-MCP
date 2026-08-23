import { Locator, Page, expect } from '@playwright/test';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';

export class RequestLoanPage {
    private readonly page: Page;
    private readonly loanAmount: Locator;
    private readonly downPayment: Locator;
    private readonly fromAccountId: Locator;
    private readonly applyNow: Locator;
    private readonly loanConfirmationMessage: Locator;
    private readonly newAccount: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loanAmount = page.locator('#amount');
        this.downPayment = page.locator('#downPayment');
        this.fromAccountId = page.locator('#fromAccountId');
        this.applyNow = page.locator('input[value="Apply Now"]');
        this.loanConfirmationMessage = page.locator('#requestLoanResult h1');
        this.newAccount = page.locator('#newAccountId');
    }

    async navigate() {
        await this.page.goto(ParabankUtils.buildUrl(Endpoints.LOAN));
        await expect(this.page).toHaveURL(/.*requestloan*.htm/);
    }

    async fillLoanAmount(amount: string) {
        await expect(this.loanAmount).toBeVisible();
        this.loanAmount.fill(amount);
    }

    async filldownPayment(amount: string) {
        await expect(this.downPayment).toBeVisible();
        this.downPayment.fill(amount);
    }

    async selectfromAccountId(accountId: string) {
        this.fromAccountId.selectOption(accountId);
    }

    async clickOnApplyNowButton() {
        await expect(this.applyNow).toBeVisible();
        await this.applyNow.click();
    }
    getPage(): Page {
        return this.page;
    }

    getLoanConfirmationMessage() {
        return this.loanConfirmationMessage;
    }

    async getNewAccountNumber(): Promise<string> {
        await expect(this.newAccount).toBeVisible();
        // This already extracts the text!
        return await this.page.locator('#newAccountId').innerText();
    }

    async getNewAccountLink(){
        await expect(this.newAccount).toBeVisible();
        return this.newAccount;
    }
}