import logger from "../config/logger.config.js";
import sender from "../config/nodemailer.config.js";
import otpEmailTemplate from "../email-templates/otp-template.js";

const sendOtp = async (email, name, otp) => {
    try {
        const mailOptions = {
            from: `"Flight Access Portal" <no-reply@flightaccess.com>`,
            to: email,
            subject: "Your OTP Verification Code",
            html: otpEmailTemplate(name, otp),
        };

        await sender.sendMail(mailOptions);
        logger.info(`OTP email sent successfully to ${email}`);
        return true;
    } catch (error) {
        logger(`Failed to send OTP email to ${email}:`, error.message);
        return new Error(`Failed to send OTP email to ${email}:`, error.message);
    }
};

export default sendOtp;