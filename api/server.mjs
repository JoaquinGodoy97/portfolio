import express from 'express';
import cors from 'cors';
import {getRepoList} from './fetchRepo.mjs'
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(express.static('public'));

// Dynamically allow all origins in dev, and Vercel subdomains in prod
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://*.vercel.app' : '*',
    methods: ['GET', 'POST']  // Specify allowed methods for additional control
}));


app.get('/api/repos', async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  // Specify allowed methods

    try{
        console.log('Starting fetch process...');
        const repoData = await getRepoList();
        // console.log('Data fetched successfully:', repoData);

        if (!repoData) {
            console.error('No data returned from getRepoList');
            return res.status(500).json({ error: 'No data received' });
        }

        res.json(repoData);
    } catch (err) {
        res.status(500).send(err.message)
    }
}); 

// if (process.env.NODE_ENV !== 'production' || !process.env.NODE_ENV) { 
    app.listen(PORT, '0.0.0.0', () => { 
        console.log(`Server running on http://localhost:${PORT}`); 
    });
// }

export default serverless(app, {
    basePath: '/api'  // Optional: Set a base path if needed
});