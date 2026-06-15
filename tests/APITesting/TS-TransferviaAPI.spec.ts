import { test } from '../../Fixture/APIHandler.fixture';
import env from '../../testdata/env.json';
import ApiData  from '../../utils/AIDUtil';

test('Transfer Funds and Verify via API', async ({ customerId, request }) => {
    let apiData = new ApiData();
    let AccountList = await apiData.getAccountId(request, customerId)
    let accountId1 = AccountList[0].id;
    const response = await request.post(`${env.baseurl}/createAccount`,
        {
            headers: {Accept: 'application/json'},
            params: {customerId: Number(customerId),newAccountType: 1,fromAccountId: Number(accountId1)}
        });
    console.log('Status:', response.status());
    const body = await response.text();
    console.log('Response:', body);
    let AccountList1 = await apiData.getAccountId(request, customerId)
    const accountId2 = AccountList1[1].id;
    console.log('Account ID 1:', accountId1);
    console.log('Account ID 2:', accountId2);
    const transferResponse = await request.post(`${env.baseurl}/transfer`,
        {
            headers: {Accept: 'application/json'},
            params: {fromAccountId: Number(accountId1),toAccountId: Number(accountId2),amount: 100}
        });
    console.log('Transfer Status:', transferResponse.status());
    const transferBody = await transferResponse.text();
    console.log('Transfer Response:', transferBody);
});