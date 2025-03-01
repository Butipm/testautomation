import { BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "./pageFixture";
import { setupBrowser } from "./browserSetup"; // Import the setupBrowser function
import { Browser, Page } from "playwright";

let page: Page;
let browser: Browser;

// Set default timeout for tests
setDefaultTimeout(60000);

// BeforeAll hook to set up the browser and page
BeforeAll(async function () {
    const tags = process.env.TAGS;
    const project = process.env.PROJECT;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const url = process.env.URL;
    const browserType = process.env.BROWSER_TYPE || 'chromium'; // Default to chromium if not provided
    const isMobile = process.env.IS_MOBILE === 'true'; // Check if mobile mode is enabled
    const device = process.env.DEVICE || 'iPhone 12'; // Default to iPhone 12 if not provided

    // Check for required environment variables
    if (!tags || !project) {
        console.error('Both --tags and --project arguments are required');
        throw new Error('Both --tags and --project arguments are required');
    }

    console.log('Detected tags:', tags);
    console.log('Detected project:', project);
    if (username) console.log('Detected username:', username);
    if (password) console.log('Detected password:', password);
    if (url) console.log('Detected URL:', url);
    console.log('Detected browser type:', browserType);
    console.log('Is mobile mode:', isMobile);
    console.log('Detected device:', device);

    try {
        // Call the setupBrowser function to initialize the browser and page
        const result = await setupBrowser(project, browserType, isMobile, device);
        browser = result.browser;
        page = result.page;

        // Set the fixture page
        fixture.page = page;
    } catch (error) {
        console.error('Error during browser setup:', error);
        throw error; // Rethrow the error to ensure it is logged properly
    }
});

// AfterAll hook to clean up after tests
AfterAll(async function () {
    if (browser && browser.isConnected()) {
        try {
            await browser.close();
        } catch (err) {
            console.warn("Error closing the browser: ", err);
        }
    }

    if (fixture.page && !fixture.page.isClosed()) {
        try {
            await fixture.page.close();
        } catch (err) {
            console.warn("Error closing the page: ", err);
        }
    }
});
