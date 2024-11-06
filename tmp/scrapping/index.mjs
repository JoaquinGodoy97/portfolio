import { chromium } from 'playwright';

export async function getRepoList() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://github.com/JoaquinGodoy97?tab=repositories');

    const repoList = await page.$$eval('ul .col-12.d-flex.flex-justify-between.width-full.py-4.border-bottom.color-border-muted.public.source', elements => {
        return elements.map(el => {
            const repoName = el.querySelector('h3 a[itemprop="name codeRepository"]').textContent.trim();
            const repoUrl = el.querySelector('h3 a[itemprop="name codeRepository"]').href;
            const status = el.querySelector('span.Label')?.textContent.trim() || 'No status';
            const description = el.querySelector('div p[itemprop="description"]')?.textContent.trim() || 'No description';
            const whenUpdated = el.querySelector('relative-time')?.textContent.trim();
            return { repoName, repoUrl, status, description, whenUpdated };
        });
    });

    // console.log(repoList)

    const repoListExport = []

    for (const repo of repoList) {
        
        const repositoryPage = await browser.newPage()
        await repositoryPage.goto(repo.repoUrl);

        const languageProgress = await repositoryPage.$$eval('span.Progress > span.Progress-item', elements => {
            return elements.map(el => {
                const language = el.getAttribute('aria-label'); 
                return language
                }
            );


        })

        // console.log(`Repository: ${repo.repoName}, Languages:`, languageProgress);

        await repositoryPage.close();
        repoListExport.push({repoName: repo.repoName, languages: languageProgress})
    }

    await browser.close();

    return {
        repoList: repoListExport,
        repoDetails: repoList
    }
};
