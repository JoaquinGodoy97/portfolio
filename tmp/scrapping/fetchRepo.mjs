import fetch from 'node-fetch';

export async function getRepoList() {
    const username = 'JoaquinGodoy97';
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(reposUrl);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error('Failed to fetch repos');
    }

    const repos = await response.json();
    console.log('Fetched repos:', repos); 

    const repoListExport = [];
    for (const repo of repos) {
        const languagesResponse = await fetch(repo.languages_url);
        const languagesData = await languagesResponse.json();
        repoListExport.push({
            repoName: repo.name,
            repoUrl: repo.html_url,
            description: repo.description || 'No description',
            whenUpdated: repo.updated_at,
            languages: languagesData,
        });
        await delay(200); // Delay 200ms between each call
    }
    
    // You could fetch languages for each repo as a separate API call if needed
    return {
        repoList: repoListExport
    };
}