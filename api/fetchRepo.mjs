import fetch from 'node-fetch';

// const TIMEOUT = 5000; // 5 seconds timeout
const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

export async function getRepoList() {
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(reposUrl,
        {headers: {
            'Authorization': `token ${token}`,
            // 'Accept': 'application/vnd.github.v3+json',  // Optional: specify API version
            }
        }
        
    );
    console.log(response)

    // Check if the response is OK
    if (!response.ok) {
        console.error('Failed to fetch repos');
        throw new Error('Failed to fetch repos', errorData.message);
    }

    const repos = await response.json();
    // console.log(repos)

    const repoListExport = await Promise.all(
        repos.map(async (repo) => {
            // console.log(repo)
            try {
                // console.log(`Fetching languages for ${repo.name}...`);
                const languagesResponse = {}
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
                // const languagesData = await languagesResponse.json();
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

    console.log(repoListExport)

    // You could fetch languages for each repo as a separate API call if needed
    return {
        repoList: repoListExport
    };
}