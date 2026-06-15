import { test as base, expect } from '@playwright/test';
import credentials from '../testdata/creds.json';
import  RegistrationPage  from '../Pages/Registration.page';
import LoginPage from '../Pages/Login.page';
import env from '../testdata/env.json';

const { Username, Password } = credentials;

type ApiFixtures = {
    customerId: number;
};

export const test = base.extend<ApiFixtures>({
    customerId: async ({ request, page }, use) => {

        let custID = 0;

        const loginResponse = await request.get(
            `${env.baseurl}/login/${Username}/${Password}`,
            { headers: { 'Content-Type': 'application/json',"Accept": "application/json" } }
        );
        if (loginResponse.ok()) {
            const body = await loginResponse.json();
            custID=body.id;
        }
        if (custID == 0) {

            console.log('Customer not found. Creating user through UI...');
            const loginPage = new LoginPage(page);
            await loginPage.navigateToWelcomePage();
            await loginPage.navigateToRegistrationPage();
            const registrationPage = new RegistrationPage(page);
            await registrationPage.registerUser();
            const retryResponse = await request.get(
                `${env.baseurl}/login/${Username}/${Password}`,
                { headers: { 'Content-Type': 'application/json',"Accept": "application/json" } }
            );

            expect(retryResponse).toBeOK();

            const retryBody = await retryResponse.json();
            const retryCID = retryBody.id;

            if (!retryCID) {
                throw new Error(
                    'Customer created but customerId could not be retrieved'
                );
            }

            custID = retryCID;
        }

        await use(custID);
    }
});