import fetch from 'node-fetch';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') { 
    dotenv.config(); 
}

const username = process.env.GITHUB_USERNAME
const token = process.env.GITHUB_API_TOKEN
const options = {headers: {
    'Authorization': `token ${token}`,
    }
}

export async function getRepoList() {
    const reposUrl = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(reposUrl, options);

    if (!response.ok) {
        console.error('Failed to fetch repos');
        throw new Error('Failed to fetch repos', errorData.message);
    }

    const repos = await response.json();

    // ORGS REPOSITORY
    const repoOrgUrl = "https://api.github.com/orgs/Fulbito5Manager/repos";
    const responseRepoOrg = await fetch(repoOrgUrl, options)
    const dataRepoOrg = await responseRepoOrg.json();

    if (!responseRepoOrg.ok) {
        console.error('Failed to fetch reposORGS');
        throw new Error('Failed to fetch repos', errorData.message);
    }

    for (const repo of dataRepoOrg) {

        if (repo.name === "ranking_app") {
            repos.push(repo)
        } 
    }
    // console.log(repos)

    const enrichedRepos = await Promise.all(
        repos
        .filter(async (repo) => !repo.archived)
        .map(async (repo) => {
            try {
                const languagesResponse = await fetch(repo.languages_url, options);

                if (!languagesResponse.ok) {
                    console.error(`Failed to fetch languages for ${repo.name}`);
                    return {
                        repoName: repo.name,
                        repoUrl: repo.html_url,
                        description: repo.description || 'No description',
                        whenUpdated: repo.updated_at,
                        gituser: username,
                        languages: {}, 
                    };
                }
                const languagesData = await languagesResponse.json();

                return {
                    repoName: repo.name,
                    repoUrl: repo.html_url,
                    description: repo.description || 'No description',
                    whenUpdated: repo.updated_at,
                    gituser: username,
                    languages: languagesData,
                    archived: repo.archived
                };

            } catch (err) {
                console.error(`Error fetching languages for ${repo.name}: ${err.message}`);
                return null;
            }
        })
    ).then((results) => results.filter(Boolean));

    const repoListExport = enrichedRepos.filter(repo => !repo.archived);

    return {
        repoList: repoListExport
    };
}