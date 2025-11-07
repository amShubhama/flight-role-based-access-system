import User from "../models/user.model.js"
import statusCodes from 'http-status-codes';
import logger from '../config/logger.config.js';
import { ErrorResponse, SuccessResponse } from "../utils/request-response.js";
import generateOtp from "../utils/generate-otp.js";
import sendOtp from "../utils/send-otp.js";
import TempUser from "../models/temp.user.model.js";

// api/v1/users/signup -> post
export const signup = async (req, res) => {
    try {

        const isAlreadySignedUp = await User.findOne({ email: req.body.email });
        if (isAlreadySignedUp) {
            return res.status(statusCodes.CONFLICT)
                .json(ErrorResponse('User already exists with this email address.'));
        };

        const isAlreadyOtpGenerated = await TempUser.findOne({ email: req.body.email });
        if (isAlreadyOtpGenerated) {
            return res.status(statusCodes.TOO_MANY_REQUESTS)
                .json(ErrorResponse('OTP has already been generated for this email. Please wait for 5 minutes before requesting a new OTP.'));
        };

        const otp = generateOtp();
        logger.info(`otp: ${otp}`);

        const mailRes = await sendOtp(req.body.email, req.body.name, otp);
        if (!mailRes) {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse('Failed to send OTP. Please try again after some time.'));
        }

        const newUser = new TempUser({ ...req.body, otp });
        await newUser.save();



        logger.info(`New user registration initiated: ${newUser.email}`);

        return res.status(statusCodes.CREATED)
            .json(SuccessResponse('User registration initiated successfully. Please verify OTP sent to your email.',
                { id: newUser._id, email: newUser.email }));

    } catch (error) {
        logger.error(`Error during user registration initiation: ${error.message}`);

        return res.status(statusCodes.BAD_REQUEST)
            .json(ErrorResponse('User registration initiation failed. Please try again', error.message));
    }
};

// /api/v1/users/auth/verify-otp -> post
export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        // if the user is already verified and tries to verify again
        const isAlreadyVerified = await User.findOne({ email: req.body.email });
        if (isAlreadyVerified) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json(ErrorResponse('OTP has already been verified. You can log in now.'));
        }

        // Find the temporary user by email
        const tempUser = await TempUser.findOne({ email: req.body.email });
        if (!tempUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .json(ErrorResponse('User not found or OTP expired.'));
        }

        // Check OTP expiry
        if (tempUser.otpExpiresAt < Date.now()) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json(ErrorResponse('OTP has expired. Please request a new one.'));
        }

        // Compare OTP using model method
        const isOtpValid = await tempUser.compareOtp(otp);
        if (!isOtpValid) {
            return res
                .status(statusCodes.UNAUTHORIZED)
                .json(ErrorResponse('Invalid OTP. Please try again.'));
        }

        // OTP verified successfully — move user to main collection
        const newUser = new User({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
            role: tempUser.role,
        });
        await newUser.save();

        // Delete temp user entry
        await TempUser.findByIdAndDelete(tempUser._id);

        logger.info(`OTP verified & user registered: ${newUser.email}`);

        return res
            .status(statusCodes.CREATED)
            .json(SuccessResponse('OTP verified successfully. User registered.', {
                email: newUser.email,
                role: newUser.role,
            }));

    } catch (error) {
        logger.error(`OTP verification failed: ${error.message}`);
        return res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('Something went wrong while verifying OTP.', error.message));
    }
};

// api/v1/users/login -> get
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(statusCodes.NON_AUTHORITATIVE_INFORMATION)
                .json(ErrorResponse('User not registered! Please registered first then try to login'));
        }
        if (!user.comparePassword(password)) {
            return res.status(statusCodes)
                .json(ErrorResponse('Wrong password'));
        }

    } catch (error) {

    }
}