const { spawn } = require('child_process');

// Manually parse command-line arguments
const args = process.argv.slice(2);
console.log('Command-line arguments:', args);

const tagsArg = args.find(arg => arg.startsWith('--tags='));
const projectArg = args.find(arg => arg.startsWith('--project='));
const usernameArg = args.find(arg => arg.startsWith('--username='));
const passwordArg = args.find(arg => arg.startsWith('--password='));
const urlArg = args.find(arg => arg.startsWith('--url='));
const browserArg = args.find(arg => arg.startsWith('--browser='));
const mobileArg = args.find(arg => arg.startsWith('--mobile='));
const deviceArg = args.find(arg => arg.startsWith('--device='));

if (!tagsArg || !projectArg) {
    throw new Error('Both --tags and --project arguments are required');
}

const tags = tagsArg.split('=')[1];
const project = projectArg.split('=')[1];
const username = usernameArg ? usernameArg.split('=')[1] : undefined;
const password = passwordArg ? passwordArg.split('=')[1] : undefined;
const url = urlArg ? urlArg.split('=')[1] : undefined;
const browserType = browserArg ? browserArg.split('=')[1] : 'chromium'; // Default to chromium if not provided
const isMobile = mobileArg ? mobileArg.split('=')[1] === 'true' : false; // Correctly parse mobile argument
const device = deviceArg ? deviceArg.split('=')[1] : 'iPhone 12'; // Default to iPhone 12 if not provided

console.log('Detected tags:', tags);
console.log('Detected project:', project);
if (username) console.log('Detected username:', username);
if (password) console.log('Detected password:', password);
if (url) console.log('Detected URL:', url);
console.log('Detected browser type:', browserType);
console.log('Is mobile mode:', isMobile);
console.log('Detected device:', device);

// Set environment variables for tags, project, username, password, url, browser type, and mobile mode
process.env.TAGS = tags;
process.env.PROJECT = project;
if (username) process.env.USERNAME = username;
if (password) process.env.PASSWORD = password;
if (url) process.env.URL = url;
process.env.IS_MOBILE = isMobile.toString(); // Convert boolean to string
process.env.DEVICE = device; // Set device type

// Define available browser types
const availableBrowsers = ['chromium', 'firefox', 'webkit'];

// Determine which browsers to run
let browsersToRun = [];
if (browserType === 'all') {
    browsersToRun = availableBrowsers; // Run all browsers
} else {
    browsersToRun = [browserType]; // Run the specified browser
}

// Function to run tests for a specific browser
const runTestsForBrowser = (browser) => {
    return new Promise((resolve) => {
        // Set the browser type in the environment variable
        process.env.BROWSER_TYPE = browser;

        // Prepare cucumber-js command with the --tags argument
        const cucumberArgs = [
            '--config=cucumber.js',
            `--tags=${tags}`
        ];

        console.log(`Running tests for browser: ${browser}`); // Log the browser being tested

        // Spawn the cucumber-js process
        const cucumberProcess = spawn('cucumber-js', cucumberArgs, { stdio: 'inherit' });

        cucumberProcess.on('close', (code) => {
            console.log(`cucumber-js process exited with code ${code}`);
            if (code !== 0) {
                console.error(`cucumber-js tests failed for ${browser}`);
            }
            resolve(); // Always resolve to continue to the next browser
        });
    });
};

// Run tests sequentially for each browser
(async () => {
    for (const browser of browsersToRun) {
        await runTestsForBrowser(browser); // No try-catch needed since we handle errors inside the function
    }
})();
