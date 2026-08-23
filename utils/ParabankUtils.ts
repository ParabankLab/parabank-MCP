import fs from 'fs';
import path from 'path';

export const Endpoints = {
    INDEX: 'parabank/index.htm',
    ADMIN: 'parabank/admin.htm',
    OVERVIEW: 'parabank/overview.htm',
    REGISTER: 'parabank/register.htm',
    TRANSFER: 'parabank/transfer.htm',
    LOAN: 'parabank/requestloan.htm',
    ACTIVITY: 'parabank/activity.htm?id=',
    TRANSFER_API: '**/parabank/services_proxy/bank/transfer**',
    ACCOUNTS_API: '**/parabank/services_proxy/bank/customers/**/accounts'
} as const;

export type EndpointType = typeof Endpoints[keyof typeof Endpoints];

export class ParabankUtils {
    public static readonly BASE_URL: string = "http://localhost:8080/";
    public static readonly SHOW_TRANSFER_COMPLETE: string = "Transfer Complete!";
    public static readonly SHOW_LOAN_REQUEST_PROCESSED: string = "Loan Request Processed";

    public static buildUrl(endpoint: EndpointType): string {
        return this.BASE_URL + endpoint;
    }

    public static getTestData() {
        const loginData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/testData.json'), 'utf-8'));
        return loginData;
    }

  

}