import {Page, Locator} from '@playwright/test';
import credentials from '../testdata/creds.json'
import env from '../testdata/env.json'

export default class LoginPage {
    readonly page : Page;
    username : Locator;
    password : Locator;
    loginButton : Locator;
    registerButton : Locator;
    constructor(page : Page){
        this.page = page;
        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.getByText('Log In', {exact: true});
        this.registerButton = page.getByText('Register', {exact: true});
    }
    async navigateToWelcomePage(){
        await this.page.goto(env.url);
    }

    async loginUser(){
        await this.username.fill(credentials.Username);
        await this.password.fill(credentials.Password);
        await this.loginButton.click();
    }
    async navigateToRegistrationPage(){
        await this.registerButton.click();
    }
}