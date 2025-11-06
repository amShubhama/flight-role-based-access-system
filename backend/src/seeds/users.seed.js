import logger from "../config/logger.config.js";
import User from "../models/user.model.js";

const users = [
    {
        "name": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "password": "Password@123",
        "role": "admin"
    },
    {
        "name": "Priya Mehta",
        "email": "priya.mehta@example.com",
        "password": "Password@123",
        "role": "user"
    },
    {
        "name": "Rohit Verma",
        "email": "rohit.verma@example.com",
        "password": "Password@123",
        "role": "user"
    },
    {
        "name": "Neha Kapoor",
        "email": "neha.kapoor@example.com",
        "password": "Password@123",
        "role": "user"
    },
    {
        "name": "Vikram Singh",
        "email": "vikram.singh@example.com",
        "password": "Password@123",
        "role": "user"
    }
];

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        users.forEach(async (user) => {
            await new User(user).save();
        });
        logger.info('Users seeded successfully');
    } catch (error) {
        logger.error(`Failed to seed users`);
    }
}

export default seedUsers;