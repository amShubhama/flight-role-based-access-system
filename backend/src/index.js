import express from 'express'
import cors from 'cors';
import { PORT } from './config/server-config.js';

const app = express();



const setupAndStartServer = () => {
    try {
        //middlewares
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        //api
        app.get('/health', (req, res) => {
            res.send('Working');
        });

        //start server
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`)
        });
    } catch (error) {
        console.log(error.message);
    }
}

setupAndStartServer();