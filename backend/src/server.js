import express from 'express';
import path from 'path';
import { routes } from './routes/index.js';
import { initializeDbConnection } from './db.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')))

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})


routes.forEach(route => {
    app[route.method](route.path, route.handler);
});


initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });