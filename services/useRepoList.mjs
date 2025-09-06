// root/services/useRepoList.mjs
import { getRepoList } from '../tmp/scrapping/fetchRepo.mjs';

// Use getRepoList or any other logic you need
export async function fetchRepoData() {
    const repoList = await getRepoList();
    return repoList;
}
