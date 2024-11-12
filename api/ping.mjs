import axios from "axios";
import dotenv from 'dotenv';

dotenv.config(); 
// public/app.js
const url = process.env.BASE_URL || 'http://localhost:3000';
const interval = 5000; // Interval in milliseconds (30 seconds)

//Reloader Function
function reloadWebsite() {
    axios.get(url)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}

setInterval(reloadWebsite, interval);
