import {Page, Locator, expect} from '@playwright/test';
import register from '../testdata/register.json'
import credentials from '../testdata/creds.json'
export default class RegistrationPage {
    readonly page : Page;
    fName : Locator;
    lName : Locator;
    Address : Locator;
    City : Locator;
    State : Locator;
    ZipCode : Locator;
    Phone : Locator;
    SSN : Locator;
    Username : Locator;
    Password : Locator;
    ConfirmPassword : Locator;
    RegisterButton : Locator;
    constructor(page : Page) {
        this.page = page;
        this.fName = page.locator('input[name="customer.firstName"]');
        this.lName = page.locator('input[name="customer.lastName"]');
        this.Address = page.locator('input[name="customer.address.street"]');
        this.City = page.locator('input[name="customer.address.city"]');
        this.State = page.locator('input[name="customer.address.state"]');
        this.ZipCode = page.locator('input[name="customer.address.zipCode"]');
        this.Phone = page.locator('input[name="customer.phoneNumber"]');
        this.SSN = page.locator('input[name="customer.ssn"]');
        this.Username = page.locator('input[name="customer.username"]');
        this.Password = page.locator('input[name="customer.password"]');
        this.ConfirmPassword = page.locator('input[name="repeatedPassword"]');
        this.RegisterButton = page.getByText('Register', {exact: true}).nth(1);
    }

    async registerUser(){
        await this.fName.fill(register.firstName);
        await this.lName.fill(register.lastName);
        await this.Address.fill(register.address.street);
        await this.City.fill(register.address.city);
        await this.State.fill(register.address.state);
        await this.ZipCode.fill(register.address.zipCode);
        await this.Phone.fill(register.phoneNumber);
        await this.SSN.fill(register.ssn);
        await this.Username.fill(credentials.Username);
        await this.Password.fill(credentials.Password);
        await this.ConfirmPassword.fill(credentials.ConfirmPassword);
        await this.RegisterButton.click();
    }
    async verifyRegistration(){
        await expect(this.page.getByText('Your account was created successfully. You are now logged in.', {exact: true})).toBeVisible();
    }
    async RegisterUserWithMissingFields(){
        await this.RegisterButton.click();
    }
    async RegisterUserWithInvalidData(){
        await this.fName.fill('1234');
        await this.lName.fill('5678');
        await this.Address.fill('!@#$');
        await this.City.fill('^&*()');
        await this.State.fill('ABCD');
        await this.ZipCode.fill('ABCDE');
        await this.Phone.fill('Phone123');
        await this.SSN.fill('SSN456');
        await this.Username.fill("invalidUser");
        await this.Password.fill("invalidPass");
        await this.ConfirmPassword.fill("invalidPass");
        await this.RegisterButton.click();
    }
}