import {test} from '@playwright/test';
import LoginPage from '../../Pages/Login.page';
import takeScreenshot from '../../utils/Screenshot';
import {LogoutPage} from '../../Pages/Logout.page';

test("User Login and Logout", async ({page})=>{
    const loginPage = new LoginPage(page);
    // const logoutPage = new LogoutPage(page);
    await loginPage.navigateToWelcomePage();
    await loginPage.loginUser();
    await takeScreenshot(page, test.info(), {type: "UI"});
});

test.describe("Negative Login Tests", () => {
    test("Login with Invalid Credentials", async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToWelcomePage();
        await loginPage.username.fill("invalidUser");
        await loginPage.password.fill("invalidPass");
        await loginPage.loginButton.click();
        await takeScreenshot(page, test.info(), {type: "UI"});
    });

    test("Login with Empty Fields", async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToWelcomePage();
        await loginPage.loginButton.click();
        await takeScreenshot(page, test.info(), {type: "UI"});
    });
});