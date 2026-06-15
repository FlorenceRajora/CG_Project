import { test } from '../../Fixture/APIHandler.fixture';
import { expect } from '@playwright/test';
import ApiData  from '../../utils/AIDUtil';
import env from '../../testdata/env.json';

test('Create New Account for the Customer and view', async ({ customerId, request }) => {
    let apiData = new ApiData();
    const AccountList = await apiData.getAccountId(request, customerId)
    const accountId = AccountList[0].id;
    const response = await request.post(`${env.baseurl}/createAccount`,
        {
            headers: {Accept: 'application/json'},
            params: {customerId: Number(customerId),newAccountType: 1,fromAccountId: Number(accountId)}
        });
    console.log('Status:', response.status());
    const body = await response.text();
    console.log('Response:', body);
    expect(response).toBeOK();
});