import { test, expect } from '../fixtures/baseTest';
import { AccountsOverviewPage } from '../pages/AccountsOverviewPage';
import { ParabankUtils, Endpoints } from '../utils/ParabankUtils';
import { ActivityPage } from '../pages/ActivityPage';
import { AdminPage } from '../pages/AdminPage';
import { RequestLoanPage } from '../pages/RequestLoanPage';

let accountsOverviewPage: AccountsOverviewPage;
let activityPage: ActivityPage;
let requestLoanPage: RequestLoanPage;


test.beforeEach('Open url', async ({ page }) => {
    requestLoanPage = new RequestLoanPage(page);
    activityPage = new ActivityPage(page);
    accountsOverviewPage = new AccountsOverviewPage(page);
    await new AdminPage(page).initDb();
    await requestLoanPage.navigate();
});


test.describe('Request For Loan', () => {
    let newAccountNumber: string;
    test('TC-LOAN-01 - make a successful request for loan', async ({ testData }) => {
        //Act
        await requestLoanPage.fillLoanAmount(testData.requestLoanData[0].loanAmount.toString());
        await requestLoanPage.filldownPayment(testData.requestLoanData[0].downPayment.toString());
        await requestLoanPage.selectfromAccountId(testData.requestLoanData[0].accountId.toString());
        await requestLoanPage.clickOnApplyNowButton();
        // Assert
        newAccountNumber = await requestLoanPage.getNewAccountNumber();
        await expect(requestLoanPage.getLoanConfirmationMessage()).toContainText(ParabankUtils.SHOW_LOAN_REQUEST_PROCESSED);
        (await requestLoanPage.getNewAccountLink()).click();
        await expect(activityPage['page']).toHaveURL(ParabankUtils.BASE_URL + Endpoints.ACTIVITY + newAccountNumber);
    });

    test('TC-LOAN-02 - new account should be present in accounts overview with new total', async ({ testData }) => {
        //Act
        await accountsOverviewPage.navigate();
        // Assert
        expect((await accountsOverviewPage.getAccountSum()).match(testData.requestLoanData[0].totalSum));
        expect((await accountsOverviewPage.getAccountNumbers()).includes(newAccountNumber));
    });
});

