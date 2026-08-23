// src/fixtures/baseTest.ts
import { test as base } from '@playwright/test';
import { ParabankUtils } from '../utils/ParabankUtils';

// 1. Define the interface for the custom fixtures we are adding
interface MyFixtures {
    testData: any; 
}

// 2. Extend the base test object with explicit types for the parameters
export const test = base.extend<MyFixtures>({
    
    // Explicitly type 'use' as a function that takes an argument and returns a Promise
    testData: async ({}, use: (arg: any) => Promise<void>) => {
        const data = ParabankUtils.getTestData();
        
        // Everything before 'use' acts like a BeforeEach step
        await use(data); 
    },
});

export { expect } from '@playwright/test';