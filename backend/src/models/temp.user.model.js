import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const tempUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        otp: {
            type: String,
        },
        otpExpiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
    },
    {
        timestamps: true,
        strict: true,
    }
);

// Hash password and OTP before saving
tempUserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if (this.isModified('otp') && this.otp) {
        this.otp = await bcrypt.hash(this.otp, 10);
    }
    next();
});

// Method to compare entered OTP with hashed OTP
tempUserSchema.methods.compareOtp = async function (enteredOtp) {
    if (!this.otp) return false;
    return await bcrypt.compare(enteredOtp, this.otp);
};

const TempUser = mongoose.model('TemUser', tempUserSchema);
export default TempUser;