import User from "../models/user.model.js"
import statusCodes from 'http-status-codes';
import logger from '../config/logger.config.js';
import { ErrorResponse, SuccessResponse } from "../utils/request-response.js";

// api/v1/users -> post
export const signup = async (req, res) => {
    try {
        const isAlreadySignedUp = await User.findOne({ email: req.body.email });
        if (isAlreadySignedUp) {
            return res.status(statusCodes.CONFLICT)
                .json(ErrorResponse('User already exists with this email address.'));
        };

        const newUser = new User(req.body);
        await newUser.save();

        logger.info(`New user registered: ${newUser.email}`);

        return res.status(statusCodes.CREATED)
            .json(SuccessResponse('User registered successfully'));

    } catch (error) {
        logger.error(`Error during user registration: ${error.message}`);

        return res.status(statusCodes.BAD_REQUEST)
            .json(ErrorResponse('User registration failed. Please try again', error.message));
    }
};

// api/v1/users -> get
export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}