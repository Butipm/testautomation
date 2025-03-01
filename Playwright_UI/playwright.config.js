const { devices } = require("@playwright/test");

const customCapabilities = { 'e34:pacAlias': 'aws_custom_proxy_pac' };

module.exports = {
    globalSetup: require.resolve('./global-setup'),
    use: {
        headless: false,
        viewport: {
            width: 1920,
            height: 1080
        },
        storageState: 'auth.json',
        screenshot: 'only-on-failure',
        actionTimeout: 35000,
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: 'sb', // Remote setup for Chromium
            use: {
                ...devices['Desktop Chrome'], // Use desktop Chrome settings
                ignoreHTTPSErrors: true,
                proxy: {
                    server: 'http://proxy.ccc-ng-1.eu-central-1.aws.cloud:8080',
                    noProxy: ['cloud', 'net', 'localhost', '*.macc', '127.0.0.1'],
                },
                connectOptions: {
                    wsEndpoint: `wss://seleniumbox.net:433/e34/api/ws/playwright/chrome?playwright=1.47.2&token=65a63295-6930-4d&video=true&testName=Playwright_Test`,
                    capabilities: customCapabilities,
                },
                launchOptions: {
                    ignoreHTTPSErrors: true,
                },
            },
        },
        {
            name: 'firefox', // Local setup for Firefox
            use: {
                browserName: 'firefox',
                launchOptions: {
                    headless: false,
                    args: ['--start-maximized'], // Set the window size to the screen's resolution
                },
            },
        },
        {
            name: 'webkit', // Local setup for WebKit
            use: {
                browserName: 'webkit',
                launchOptions: {
                    headless: false,
                    args: ['--start-maximized'], // Set the window size to the screen's resolution
                },
            },
        },
        {
            name: 'mobile-chrome', // Mobile setup for Chrome
            use: {
                ...devices['Pixel 5'], // Use Pixel 5 device emulation
                ignoreHTTPSErrors: true,
            },
        },
        {
            name: 'mobile-firefox', // Mobile setup for Firefox
            use: {
                ...devices['iPhone 12'], // Use iPhone 12 device emulation
                ignoreHTTPSErrors: true,
            },
        },
    ],
};
