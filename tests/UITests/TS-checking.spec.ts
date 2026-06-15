import {test} from '../../Fixture/RegisterFixture.fixture';
import { CheckingPage } from '../../Pages/Checking.page';
import {ViewAccountsPage} from '../../Pages/ViewAccounts.page';
import takeScreenshot from '../../utils/Screenshot';

test("Open New Checking Account", async ({Registerfixture})=>{
    const page = Registerfixture;
    const checkingPage = new CheckingPage(page);
    const viewAccountsPage = new ViewAccountsPage(page);
    
    await checkingPage.navigateToAccountPage();
    await checkingPage.openNewAccount();
    await checkingPage.verifyAccountCreation();
    await viewAccountsPage.navigateToViewAccounts();
    await takeScreenshot(page, test.info(), {type: "UI"});
    await viewAccountsPage.verifyAccountsOverview();
})