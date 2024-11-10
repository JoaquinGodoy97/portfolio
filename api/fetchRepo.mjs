import fetch from 'node-fetch';

const username = process.env.USERNAME
const token = process.env.GITHUB_TOKEN

export async function getRepoList() {
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(reposUrl,
        {headers: {
            'Authorization': `token ${token}`,
            }
        }
    );

    if (!response.ok) {
        console.error('Failed to fetch repos');
        throw new Error('Failed to fetch repos', errorData.message);
    }

    const repos = await response.json();
    // console.log(repos)

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
                        languages: {}, 
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
                return null;
            }
        })
    ).then((results) => results.filter(Boolean));  

    return {
        repoList: repoListExport
    };
}