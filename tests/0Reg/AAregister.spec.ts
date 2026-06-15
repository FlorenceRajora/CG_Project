import {test} from '@playwright/test';
import LoginPage from '../../Pages/Login.page';
import RegistrationPage from '../../Pages/Registration.page';
import takeScreenshot from '../../utils/Screenshot';

test("User Registration", async ({page})=>{
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);
    await loginPage.navigateToWelcomePage();
    await loginPage.navigateToRegistrationPage();
    await registrationPage.registerUser();
    await takeScreenshot(page, test.info(), {type: "UI"});
    await registrationPage.verifyRegistration();
})

test.describe("Negative Registration Tests", () => {
    test("Registration with Missing Fields", async ({page}) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);
        await loginPage.navigateToWelcomePage();
        await loginPage.navigateToRegistrationPage();
        await registrationPage.RegisterUserWithMissingFields();
        await takeScreenshot(page, test.info(), {type: "UI"});
    })

    test("Registration with Invalid Data", async ({page}) => {
        const loginPage = new LoginPage(page);
        const registrationPage = new RegistrationPage(page);
        await loginPage.navigateToWelcomePage();
        await loginPage.navigateToRegistrationPage();
        await registrationPage.RegisterUserWithInvalidData();
        await takeScreenshot(page, test.info(), {type: "UI"});
    })
});