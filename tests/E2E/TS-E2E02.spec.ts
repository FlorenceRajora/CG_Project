import {test} from '../../Fixture/RegisterFixture.fixture'
import {CheckingPage} from '../../Pages/Checking.page';
import {FundsPage} from '../../Pages/Funds.page';
import takeScreenshot from '../../utils/Screenshot';
import credentials from '../../testdata/creds.json';
import env from '../../testdata/env.json';
import ApiData from '../../utils/AIDUtil'

test("E2E Test: Create Account and Transfer Funds using UI & Verify Transfer via API",  async ({Registerfixture, request})=>{
    const page = Registerfixture;
    const checkingPage = new CheckingPage(page);
    const fundsPage = new FundsPage(page);
    // Step 1: Open New Checking Account
    await checkingPage.navigateToAccountPage();
    await checkingPage.openNewAccount();
    // Step 2: Transfer Funds between Accounts
    await fundsPage.navigateToTransferFunds();
    await fundsPage.transferFunds(100);
    await fundsPage.verifyTransfer()
    await takeScreenshot(page, test.info(), {type: "UI"});
    // Step 3: Verify Transfer via API
    const response = await request.get(`${env.baseurl}/login/${credentials.Username}/${credentials.Password}`,
                { headers: { 'Content-Type': 'application/json',"Accept": "application/json" } })
    const body = await response.json();
    const customerId = body.id;
    let apiData = new ApiData();
    let AccountList = await apiData.getAccountId(request, customerId)
    let acc1Id = AccountList[0].id;
    let acc2Id = AccountList[1].id;
    const transferResponse = await request.get(`${env.baseurl}/accounts/${acc1Id}/transactions`,
                { headers: { 'Content-Type': 'application/json',"Accept": "application/json" } })
    const transactions1 = await transferResponse.json();
    console.log(`Transactions for Account 1: ${JSON.stringify(transactions1)}`);
    const transferResponse2 = await request.get(`${env.baseurl}/accounts/${acc2Id}/transactions`,
                { headers: { 'Content-Type': 'application/json',"Accept": "application/json" } })
    const transactions2 = await transferResponse2.json();
    console.log(`Transactions for Account 2: ${JSON.stringify(transactions2)}`);

})