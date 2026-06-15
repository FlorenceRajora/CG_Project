import {Page, expect, Locator} from '@playwright/test';

export class ViewAccountsPage {
    readonly page : Page;
    viewAccountsBtn : Locator;
    constructor(page : Page){
        this.page = page;
        this.viewAccountsBtn = page.getByText('Accounts Overview', {exact: true});
    }
    async navigateToViewAccounts(){
        await this.viewAccountsBtn.click();
    }
    async verifyAccountsOverview(){
        await expect(this.page.getByText('Accounts Overview', {exact: true}).nth(1)).toBeVisible();
    }
}