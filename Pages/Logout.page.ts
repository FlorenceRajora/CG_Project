import {Page, Locator} from '@playwright/test';

export class LogoutPage {
    readonly page : Page;
    logoutBtn : Locator;
    constructor(page : Page){
        this.page = page;
        this.logoutBtn = page.getByText('Log Out', {exact: true});
    }
    async logoutUser(){
        await this.logoutBtn.click();
    }
    
}