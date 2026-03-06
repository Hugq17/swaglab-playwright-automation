import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication - Login', () => {
    test('TC01 - Verify user can login successfully', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('TC02 - Login with wrong password', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('!@#$$');
        await loginPage.clickLogin();
        await expect(page.getByTestId('error')).toBeVisible();
    });

    test('TC03 - Login with locked user', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('locked_out_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC04 - Login with empty username', async ({ page }) => {
        const loginPage = LoginPage(page);
        await test.step('1. Open login page', async () => {
            await page.goto('/')
        })
        await test.step('2. Leave username empty', async () => {
            await loginPage.enterUserName('');
        })
        await test.step('3. Enter password secret_sauce', async () => {
            await loginPage.enterPassword('secret_sauce');
        })
        await test.step('4. Click Login', async () => {
            await loginPage.clickLogin();
        })
        await test.step('5. Expected Result', async () => {
            await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username is required');
        })
    })

     test('TC05 – Login with empty password', async ({ page }) => {
        const loginPage = LoginPage(page);
        await test.step('1. Open login page', async () => {
            await page.goto('/')
        })
        await test.step('2. Enter username standard_user', async () => {
            await loginPage.enterUserName('standard_user');
        })
        await test.step('3. Leave password empty', async () => {
            await loginPage.enterPassword('');
        })
        await test.step('4. Click Login', async () => {
            await loginPage.clickLogin();
        })
        await test.step('5. Expected Result', async () => {
            await expect(page.getByTestId('error')).toHaveText('Epic sadface: Password is required');
        })
    })
});

