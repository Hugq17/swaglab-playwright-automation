import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Inventory - Sort', () => {
    test('TC07 – Sort product by Name (A → Z)', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page).toHaveURL(/inventory.html/);
        await page.getByTestId('product-sort-container').selectOption('az');
        const items = await page.getByTestId('inventory_item_name').allTextContents();
        const sortedItems = [...items].sort();
        expect(items).toEqual(sortedItems)
    })
     test('TC08 – Sort product by Name (Z → A)', async ({ page }) => {
        const loginPage = LoginPage(page);
        await page.goto('/')
        await loginPage.enterUserName('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await expect(page).toHaveURL(/inventory.html/);
        await page.getByTestId('product-sort-container').selectOption('za');
        const items = await page.getByTestId('inventory_item_name').allTextContents();
        const sortedItems = [...items].sort().reverse();
        expect(items).toEqual(sortedItems)
    })
});