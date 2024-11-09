import express from 'express';
// import { fetchRepoData } from '../services/useRepoList.mjs'
import {getRepoList} from '../tmp/scrapping/fetchRepo.mjs'
import serverless from 'serverless-http';

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/repos', async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const repoData = await getRepoList();

        res.write(JSON.stringify(repoData));
        res.end();
    } catch (err) {
        res.status(500).send(err.message)
    }
// })
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV !== 'production') { 
//     app.listen(PORT, () => { 
//         console.log(`Server running on http://localhost:${PORT}`); 
    }); 
// }

// Set base path for serverless
export default serverless(app, { basePath: '/api' });
