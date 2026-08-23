import { test, expect } from '../fixtures/baseTest';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';
import { TransferPage } from '../pages/TransferPage';
import { AdminPage } from '../pages/AdminPage';
import { NetworkMocks } from '../model/NetworkMocks';
import { ActivityPage } from '../pages/ActivityPage';

let transferPage: TransferPage;
let networkMocks: NetworkMocks;
let activityPage: ActivityPage;

test.beforeEach(async ({ page }) => {
    transferPage = new TransferPage(page);
    networkMocks = new NetworkMocks(page);
    activityPage = new ActivityPage(page);
    await new AdminPage(page).initDb();
});

test.describe('Fund Transfer - Network Isolation Engine', () => {

    test('TC-MOCK-TRANSFER-01 - Should successfully process a fund transfer via mock payload injection', async ({ page, testData }) => {
        //Act
        await networkMocks.setupMutatedTransferRoute(testData);
        await page.goto(ParabankUtils.buildUrl(Endpoints.TRANSFER));
        await transferPage.fillTransferAmount(testData.transferAccountData[0].transferAmount.toString());
        await transferPage.selectFromAccountId(testData.transferAccountData[0].fromAccountId.toString());
        await transferPage.selectToAccountId(testData.transferAccountData[0].toAccountId.toString());
        await transferPage.clickOnTransferButton();

        // Assertions
        await expect(transferPage.getTransferConfirmationMessage()).toContainText(ParabankUtils.SHOW_TRANSFER_COMPLETE);

        await activityPage.navigate(testData.transferAccountData[0].toAccountId.toString());
        const actualBalance = await activityPage.getBalanceAmount();
        // Assert
        expect(actualBalance).toContain(testData.mockAccountData[0].balance.toString());
    });


    test('TC-MOCK-TRANSFER-02 - check on account activity page if the transfer is made', async ({ testData }) => {

    });

});