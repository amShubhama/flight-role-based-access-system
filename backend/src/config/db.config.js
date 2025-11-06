import mongoose from 'mongoose';
import { DBURI } from './server-config.js';
import logger from './logger.config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(DBURI);
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error(`Failed to connect to the database: ${error.message}`);
        process.exit(1); // stop the server if DB connection fails
    }
}

export default connectDB;