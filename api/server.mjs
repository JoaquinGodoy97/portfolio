import express from 'express';
// import cors from 'cors';
import {getRepoList} from './fetchRepo.mjs'
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/repos', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

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

app.listen(PORT, () => { 
    console.log(`Server running on http://localhost:${PORT}`); 
});

export default serverless(app, {
    basePath: '/api' 
});