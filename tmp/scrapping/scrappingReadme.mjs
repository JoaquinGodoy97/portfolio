import { chromium } from 'playwright';

export async function getRepoList() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://github.com/JoaquinGodoy97?tab=repositories');

    const repoList = await page.$$eval()
}