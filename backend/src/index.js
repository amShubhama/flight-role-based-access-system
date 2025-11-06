import express from 'express'
import cors from 'cors';
import { PORT } from './config/server-config.js';
import connectDB from './config/db.config.js';
import logger from './config/logger.config.js';
import apiRoutes from './routes/index.js';
import seedUsers from './seeds/users.seed.js';
const app = express();



const setupAndStartServer = async () => {
    try {
        //middlewares
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        //connect db
        await connectDB();
        await seedUsers();
        //api
        app.get('/health', (req, res) => {
            res.send('Working');
        });
        app.use('/api', apiRoutes);

        //start server
        app.listen(PORT, () => {
            logger.info(`Server is listening on PORT ${PORT}`);
        });
    } catch (error) {
        logger.error(`Failed to setup server: ${error.message}`);
    }
}

setupAndStartServer();