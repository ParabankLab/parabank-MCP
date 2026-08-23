import { test, expect } from '../fixtures/baseTest'; 
import { HomePage } from '../pages/HomePage';


test.use({ storageState: { cookies: [], origins: [] } });

let homePage: HomePage;

test.beforeEach('Open url', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigate();
});

test.describe('Positive Authentication Flow', () => {

  test('TC-POS-01 - should successfully navigate to forgot login info page', async () => {
    //Act
    await homePage.clickOnForgotLoginInfoLink();
    // Assert
    await expect(homePage.page).toHaveURL(/.*lookup.htm/);

  });

  test('TC-POS-02 - should successfully navigate to register page', async () => {
    //Act
    await homePage.clickOnRegisterLink();
    // Assert
    await expect(homePage.page).toHaveURL(/.*register.htm/);

  });

  test('TC-POS-03 - should successfully log in with valid credentials', async ({ testData }) => {
    // Act
    await homePage.login(testData.user[0].name, testData.user[0].password);
    // Assert
    await expect(homePage.page.locator('#leftPanel')).toContainText('Account Services');
  });
});




