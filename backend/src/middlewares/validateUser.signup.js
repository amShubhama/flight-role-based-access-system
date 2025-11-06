import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/request-response.js";

// middlewares/validateUserSignup.js
export const validateUserSignup = (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password || !role) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('All fields are required: name, email, password and role.'));
    }

    // name must have some Validate name field
    const nameRegex = /^[A-Za-z]{3,}(?: [A-Za-z]+)*$/;
    if (!nameRegex.test(name.trim())) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Name must be at least 3 characters long and contain only alphabets with single spaces between words.'))
    }


    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Invalid email format. Please provide a valid email address.'));
    }

    // Validate password format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(req.body.password)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Password must be at least 6 characters long and include letters, numbers, and special characters.'));
    }


    // role type validation
    if (!(role === 'admin' || role === 'user')) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Only user and admin roles are allowed'));
    }

    next();
};