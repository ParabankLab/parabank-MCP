import { Locator, Page } from '@playwright/test';
import { Endpoints, ParabankUtils } from '../utils/ParabankUtils';

export class HomePage {
  public readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly logoutLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });

  }

  async navigate() {
    await this.page.goto(ParabankUtils.buildUrl(Endpoints.INDEX));
    await this.page.waitForURL(ParabankUtils.buildUrl(Endpoints.INDEX));
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickOnRegisterLink() {
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async clickOnForgotLoginInfoLink() {
    await this.page.getByRole('link', { name: 'Forgot Login Info' }).click();
  }

  getPage(): Page {
    return this.page;
  }

  async clickOnLogoutLink() {
    await this.logoutLink.click();
  }
}