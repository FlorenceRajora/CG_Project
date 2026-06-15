import { APIRequestContext} from "@playwright/test";
import env from "../testdata/env.json";

class ApiData{
    constructor(){

    }
    async getAccountId(request: APIRequestContext, customerId: number) {
    let r1 = await request.get(`${env.baseurl}/customers/${customerId}/accounts`,{ headers: { 'Content-Type': 'application/json',"Accept": "application/json" } });
    let AIDResp = await r1.json();
    return AIDResp;
    }
}
export default ApiData