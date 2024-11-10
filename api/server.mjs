import express from 'express';
import {getRepoList} from './fetchRepo.mjs'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/repos', async (req, res) => {

    try{
        console.log('Starting fetch process...');
        const repoData = await getRepoList();

        if (!repoData) {
            console.error('No data returned from getRepoList');
            return res.status(500).json({ error: 'No data received' });
        }

        res.json(repoData);
    } catch (err) {
        res.status(500).send(err.message)
    }
}); 

app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Server running on http://localhost:${PORT}`); 
});
