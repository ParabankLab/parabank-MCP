import { Page } from '@playwright/test';
import { Endpoints } from '../utils/ParabankUtils';

export class NetworkMocks {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Intercepts the outbound Transfer API call, mutates the payload arguments,
     * and forwards the modified transaction down the wire to the real server.
     */
    async setupMutatedTransferRoute(testData: any, targetAmount: string = '99999'): Promise<void> {
        await this.page.route(Endpoints.TRANSFER_API, async (route) => {
            const request = route.request();
            const fromAccountId = 'fromAccountId';
            const toAccountId = 'toAccountId';
            const amount = 'amount';

            if (request.method() === 'POST') {
                const url = new URL(request.url());

                // 1. CLEAR the original parameters 
                url.searchParams.delete(fromAccountId);
                url.searchParams.delete(toAccountId);
                url.searchParams.delete(amount);

                // 2. Inject your clean, mutated values into the empty parameter string
                url.searchParams.set(fromAccountId, testData.transferAccountData[0].fromAccountId.toString());
                url.searchParams.set(toAccountId, testData.transferAccountData[0].toAccountId.toString());
                url.searchParams.set(amount, testData.mockAccountData[0].amount.toString());

                // 3. Forward the modified URL path string to the backend server
                return await route.continue({ url: url.toString() });
            }

            return await route.continue();
        });
    }
}