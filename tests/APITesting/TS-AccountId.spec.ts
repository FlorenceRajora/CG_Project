import {test} from "../../Fixture/APIHandler.fixture";
import {expect} from "@playwright/test";
import env from '../../testdata/env.json';
import ApiData from '../../utils/AIDUtil'

test('Get Account Details from ID', async ({customerId, request}) => {
    let apiData = new ApiData();
    const AccountList = await apiData.getAccountId(request, customerId)
    const accountId = AccountList[0].id;
    console.log('Retrieved Account ID:', accountId);
    let r1 = await request.get(`${env.baseurl}/accounts/${accountId}`,{ headers: { 'Content-Type': 'application/json',"Accept": "application/json" } });
    let body = await r1.json();
    console.log(body);
    expect(r1.status()).toBe(200);
    expect(body.customerId).toBe(customerId);
});