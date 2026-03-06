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

        test('TC02 - Login with wrong password', async ({page}) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('!@#$$');
        await loginPage.clickLogin();
        await expect(page.getByTestId('error')).toBeVisible();
    });

      test('TC03 - Login with locked user', async ({page}) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('locked_out_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});

