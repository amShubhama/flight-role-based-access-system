import mongoose from 'mongoose';
import { DBURI } from './server-config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(DBURI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1); // stop the server if DB connection fails
    }
}

export default connectDB;