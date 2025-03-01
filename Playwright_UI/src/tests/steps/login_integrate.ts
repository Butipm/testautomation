import {Given, Then, When} from "@cucumber/cucumber";
import { expect, test } from "@playwright/test";
import {fixture} from "../../hooks/pageFixture";
import { XrayUtility } from "../../utils/XrayUtility"; // Adjust the path as necessary

Given('I am integrate portal {string}', { timeout: 60000 }, async function (url) {
    // Check if the URL is the placeholder
    const portalUrl = url === "<url>" ? process.env.URL : url;

    // Navigate to the specified URL
    await fixture.page.goto(portalUrl);

    });
Given('I click login button', async function () {
    await fixture.page.getByRole('button', { name: 'Login' }).click();
});

When('I enter my username {string}', { timeout: 60000 }, async function (username) {

    // Check if the username is the placeholder
    const user = username === "<username>" ? process.env.USERNAME : username;

    await fixture.page.getByPlaceholder('User Name').click();
    await fixture.page.getByPlaceholder('User Name').fill(user);
    });

    When('I enter my password {string}', { timeout: 60000 }, async function (password) {
        // Check if the password is the placeholder
        const pass = password === "<password>" ? process.env.PASSWORD : password;

        await fixture.page.getByPlaceholder('Password').click();
        await fixture.page.getByPlaceholder('Password').fill(pass);
    });

    When('Click log in button', async function () {
        await fixture.page.getByRole('button', { name: 'Login', exact: true }).click();

    });

    Then('I failed to log in', async function () {
        await expect(fixture.page.getByText('Authentication attempt failed')).toBeVisible();

    });
