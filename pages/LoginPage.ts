import { Page } from '@playwright/test'

export function LoginPage (page: Page) {
    async function navigate() {
        await page.goto('/login');
    }
    async function enterUserName(username: string) {
        await page.getByTestId('username').fill(username);

    }
    async function enterPassword(password: string) {
        await page.getByTestId('password').fill(password);
    }
    async function clickLogin() {
        await page.getByTestId('login-button').click();
    }
    return {
        navigate,
        enterUserName,
        enterPassword,
        clickLogin
    }
}