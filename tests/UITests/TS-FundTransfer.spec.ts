import {test} from '../../Fixture/RegisterFixture.fixture';
import {FundsPage} from '../../Pages/Funds.page';
import takeScreenshot from '../../utils/Screenshot';
import {ViewAccountsPage} from '../../Pages/ViewAccounts.page';
import {SavingPage} from '../../Pages/Saving.page';

test("Transfer Funds between Accounts", async ({Registerfixture})=>{
    const page = Registerfixture;
    const fundsPage = new FundsPage(page);
    const viewAccountsPage = new ViewAccountsPage(page);
    const savingPage = new SavingPage(page);
    await savingPage.navigateToAccountPage();
    await savingPage.openNewAccount();
    await savingPage.verifyAccountCreation();
    //before transfereing funds we will check the accounts
    await viewAccountsPage.navigateToViewAccounts();
    await fundsPage.navigateToTransferFunds();
    await fundsPage.transferFunds(100);
    await viewAccountsPage.navigateToViewAccounts();
    await takeScreenshot(page, test.info(), {type: "UI"});
    //After transfering funds we will check the accounts again to verify the transfer
    await viewAccountsPage.verifyAccountsOverview();
})

test.fixme("Negative Fund Transfer between Accounts", async ({Registerfixture})=>{
    const page = Registerfixture;
    const fundsPage = new FundsPage(page);
    const viewAccountsPage = new ViewAccountsPage(page);
    const savingPage = new SavingPage(page);
    await savingPage.navigateToAccountPage();
    await savingPage.openNewAccount();
    await savingPage.verifyAccountCreation();
    //before transfereing funds we will check the accounts
    await viewAccountsPage.navigateToViewAccounts();
    await fundsPage.navigateToTransferFunds();
    await fundsPage.transferFunds(99999);
    await viewAccountsPage.navigateToViewAccounts();
    await takeScreenshot(page, test.info(), {type: "UI"});
    //After transfering funds we will check the accounts again to verify the transfer
    await viewAccountsPage.verifyAccountsOverview();
})