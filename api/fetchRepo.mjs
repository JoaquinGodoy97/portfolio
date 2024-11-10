import fetch from 'node-fetch';

const TIMEOUT = 5000; // 5 seconds timeout

export async function getRepoList() {
    const username = 'JoaquinGodoy97';
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(reposUrl);

    // Wrap fetch with a timeout
    const fetchWithTimeout = (url, options, timeout = 5000) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), timeout)
            )
        ]);
    };

    // Check if the response is OK
    if (!response.ok) {
        console.error('Failed to fetch repos');
        throw new Error('Failed to fetch repos');
    }

    const repos = await response.json();

    const repoListExport = await Promise.all(
        repos.map(async (repo) => {
            try {
                console.log(`Fetching languages for ${repo.name}...`);
                const languagesResponse = await fetchWithTimeout(reposUrl, { method: 'GET' });
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