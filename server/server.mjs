import express from 'express'
import { fetchRepoData } from '../services/useRepoList.mjs'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/repos', async (req, res) => {
    try{
        const repoData = await fetchRepoData();
        res.json(repoData);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})