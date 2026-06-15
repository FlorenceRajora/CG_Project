import {test} from '../../Fixture/RegisterFixture.fixture';
import {SavingPage} from '../../Pages/Saving.page';
import takeScreenshot from '../../utils/Screenshot';
import {ViewAccountsPage} from '../../Pages/ViewAccounts.page';

test("Open New Saving Account", async ({Registerfixture})=>{
    const page = Registerfixture;
    const savingPage = new SavingPage(page);
    const viewAccountsPage = new ViewAccountsPage(page);
    await savingPage.navigateToAccountPage();
    await savingPage.openNewAccount();
    await savingPage.verifyAccountCreation();
    await viewAccountsPage.navigateToViewAccounts();
    await takeScreenshot(page, test.info(), {type: "UI"});
    await viewAccountsPage.verifyAccountsOverview();
})

