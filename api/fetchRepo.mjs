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

    const repoListExport = await Promise.all(
        repos.map(async (repo) => {
            try {
                const languagesResponse = await fetch(repo.languages_url);
                if (!languagesResponse.ok) {
                    console.error(`Failed to fetch languages for ${repo.name}`);
                    return {
                        repoName: repo.name,
                        repoUrl: repo.html_url,
                        description: repo.description || 'No description',
                        whenUpdated: repo.updated_at,
                        languages: {},  // Empty object if languages fetch fails
                    };
                }
                const languagesData = await languagesResponse.json();
                return {
                    repoName: repo.name,
                    repoUrl: repo.html_url,
                    description: repo.description || 'No description',
                    whenUpdated: repo.updated_at,
                    languages: languagesData,
                };
            } catch (err) {
                console.error(`Error fetching languages for ${repo.name}: ${err.message}`);
                return null;  // You might want to exclude repos with errors
            }
        })
    ).then((results) => results.filter(Boolean));  // Filter out any null results


    // You could fetch languages for each repo as a separate API call if needed
    return {
        repoList: repoListExport
    };
}