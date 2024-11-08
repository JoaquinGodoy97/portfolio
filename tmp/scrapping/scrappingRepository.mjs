import fetch from 'node-fetch';

export async function getRepoList() {
    const username = 'JoaquinGodoy97';
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(reposUrl);
    const repos = await response.json();

    const repoListExport = await Promise.all(
        repos.map(async (repo) => {
            // Fetch the languages for each repository using the languages_url
            const languagesResponse = await fetch(repo.languages_url);
            const languagesData = await languagesResponse.json();

            return {
                repoName: repo.name,
                repoUrl: repo.html_url,
                description: repo.description || 'No description',
                whenUpdated: repo.updated_at,
                languages: languagesData,
            }
        })
    )
    
    // You could fetch languages for each repo as a separate API call if needed
    return {
        repoList: repoListExport,
    };
}