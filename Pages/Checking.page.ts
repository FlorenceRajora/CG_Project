import { Page, Locator, expect } from '@playwright/test';

export class CheckingPage {
    readonly page: Page;
    accountBtn: Locator;
    accountType: Locator;
    fromAccount: Locator;
    OpenNewAccountBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.accountBtn = page.getByText('Open New Account', { exact: true });
        this.accountType = page.locator('select[id="type"]');
        this.fromAccount = page.locator('#fromAccountId');
        this.OpenNewAccountBtn = page.locator('input[class="button"]');
    }
    async navigateToAccountPage() {
        await this.accountBtn.click();
    }
    async openNewAccount() {
        await this.accountType.selectOption('0');
        await this.OpenNewAccountBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyAccountCreation() {
        await expect(this.page.getByText('Congratulations, your account is now open.')).toBeVisible();
    }

}