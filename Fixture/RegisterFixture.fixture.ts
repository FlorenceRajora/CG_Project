import {test as base, Page} from '@playwright/test';
import LoginPage from '../Pages/Login.page';
import RegisterPage from '../Pages/Registration.page';
type RegisterFixture = {
    Registerfixture : Page;
};

export const test=base.extend<RegisterFixture>({
    Registerfixture:async({page,request
    },use)=>{
    const Login=new LoginPage(page);
    await Login.navigateToWelcomePage();
    await Login.loginUser();
    if(await Login.registerButton.isVisible()){
        await Login.navigateToRegistrationPage();
        const registerPage=new RegisterPage(page);
        await registerPage.registerUser();
    }
    await use(page);
    }
})