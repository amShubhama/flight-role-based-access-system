const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // ensures a 6-digit OTP
    return otp.toString();
}

export default generateOtp;