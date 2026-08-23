import { test, expect } from '../fixtures/baseTest';
import { ParabankUtils } from '../utils/ParabankUtils';
import { TransferPage } from '../pages/TransferPage';
import { ActivityPage } from '../pages/ActivityPage';
import { AdminPage } from '../pages/AdminPage';

let transferPage: TransferPage;
let activityPage: ActivityPage;


test.beforeEach('Open url', async ({ page }) => {
    transferPage = new TransferPage(page);
    activityPage = new ActivityPage(page);
    await new AdminPage(page).initDb();
    await transferPage.navigate();
});


test.describe('Transfer Funds between Accounts', () => {

    test('TC-TRANSFER-01 - make a successful transfer', async ({ testData }) => {
        //Act
        await transferPage.fillTransferAmount(testData.transferAccountData[0].transferAmount.toString());
        await transferPage.selectFromAccountId(testData.transferAccountData[0].fromAccountId.toString());
        await transferPage.selectToAccountId(testData.transferAccountData[0].toAccountId.toString());
        await transferPage.clickOnTransferButton();
        // Assert
        await expect(transferPage.getTransferConfirmationMessage()).toContainText(ParabankUtils.SHOW_TRANSFER_COMPLETE);

        await activityPage.navigate(testData.transferAccountData[0].toAccountId.toString());
        const actualBalance = await activityPage.getBalanceAmount();
        // Assert
        expect(actualBalance).toContain(testData.transferAccountData[0].toAfterTrBalance.toString());
    });
});

