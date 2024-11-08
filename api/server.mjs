import express from 'express';
import { fetchRepoData } from '../services/useRepoList.mjs'
import serverless from 'serverless-http';

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

// export const handler = serverless(app)

if (process.env.NODE_ENV !== 'production') { 
    app.listen(PORT, () => { 
        console.log(`Server running on http://localhost:${PORT}`); 
    }); 
}