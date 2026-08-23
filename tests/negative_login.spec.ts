import { HomePage } from '../pages/HomePage';
import { test, expect } from '../fixtures/baseTest'; 

let homePage: HomePage;

test.beforeEach('Open url', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigate();
});

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Negative Authentication Flow', () => {

  test('TC-NEG-00 - Log Out Registered User', async () => {
    //Act
    //Assert
    await expect(homePage['page']).toHaveURL(/.*index*.htm/);
    await expect(homePage['page'].getByRole('heading', { name: `Customer Login`, exact: true })).toBeVisible();
  });

  test('TC-NEG-01 - should display error message for invalid login credentials', async ({ testData }) => {
    // Act
    await homePage.login(testData.user[1].name, testData.user[1].password);
    // Assert
    await expect(homePage.page.locator('#rightPanel')).toContainText('The username and password could not be verified.');
  });
});



