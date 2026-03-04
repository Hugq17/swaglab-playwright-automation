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

});