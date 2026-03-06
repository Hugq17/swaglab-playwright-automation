import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Cart - product', () => {
    test('TC11 – Add product to cart', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page).toHaveURL(/inventory.html/);
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
    })
     test('TC12 – Remove product from cart', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page).toHaveURL(/inventory.html/);
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.getByTestId('shopping-cart-badge')).toBeVisible()
        await page.getByTestId('remove-sauce-labs-backpack').click();
        await expect(page.getByTestId('shopping-cart-badge')).toBeHidden()
    })
})