import {test} from "../../Fixture/APIHandler.fixture";
import {expect} from "@playwright/test";
import env from '../../testdata/env.json';

test('Get All the List of Accounts of the Customer', async ({customerId, request}) => {
    let r1 = await request.get(`${env.baseurl}/customers/${customerId}/accounts`,{ headers: { 'Content-Type': 'application/json',"Accept": "application/json" } });
    let body = await r1.json();
    console.log(body);
    expect(r1.status()).toBe(200);
    const accountId1 = body[0].id;
    console.log('Account ID 1:', accountId1);
});