import { chromium, firefox, webkit, devices } from "playwright";

export async function setupBrowser(project, browserType, isMobile, device) {
    let browser;
    let page;

    if (project === 'remote') {
        console.log('Running in SB mode');
        // Connect to the specified remote browser
        if (browserType === 'firefox') {
            browser = await firefox.connect({
                wsEndpoint: 'wss://seleniumbox.net:433/e34/api/ws/playwright/firefox?playwrightVersion=1.47.2&token=4118623d-93b9-4b&video=true&testName=Playwright_Test',
            });
        } else if (browserType === 'webkit') {
            browser = await webkit.connect({
                wsEndpoint: 'wss://seleniumbox.net:433/e34/api/ws/playwright/webkit?playwrightVersion=1.47.2&token=4118623d-93b9-4b&video=true&testName=Playwright_Test',
            });
        } else {
            // Default to chromium
            browser = await chromium.connect({
                wsEndpoint: 'wss://seleniumbox.net:433/e34/api/ws/playwright/chrome?playwrightVersion=1.47.2&token=4118623d-93b9-4b&video=true&testName=Playwright_Test',
            });
        }

        const proxySettings = {
            server: 'http://proxy.ccc-ng-1.eu-central-1.aws.cloud.:8080',
            bypass: "*cloud,*.net,localhost,*.mac,127.0.0.1",
        };

        const contextOptions = {
            proxy: proxySettings,
            ignoreHTTPSErrors: true,
        };

        // If mobile mode is enabled, use device emulation
        if (isMobile) {
            const deviceConfig = devices[device] || devices['iPhone 12']; // Use specified device or default to iPhone 12
            const context = await browser.newContext({ ...contextOptions, ...deviceConfig });
            page = await context.newPage();
        } else {
            const context = await browser.newContext(contextOptions);
            page = await context.newPage();
        }
    } else if (project === 'local') {
        console.log('Running in local mode');
        // Launch the specified browser type
        if (isMobile) {
            // Use mobile emulation
            const deviceConfig = devices[device] || devices['iPhone 12']; // Use specified device or default to iPhone 12
            browser = await chromium.launch({ headless: false });
            page = await browser.newContext({ ...deviceConfig }).newPage();
        } else {
            // Launch the specified browser type
            if (browserType === 'firefox') {
                browser = await firefox.launch({ headless: false });
            } else if (browserType === 'webkit') {
                browser = await webkit.launch({ headless: false });
            } else {
                // Default to chromium
                browser = await chromium.launch({ headless: false });
            }
            page = await browser.newPage();
        }
    } else {
        console.error('Unknown project type');
        throw new Error('Unknown project type');
    }

    return { browser, page };
}
