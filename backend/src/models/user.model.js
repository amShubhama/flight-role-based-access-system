import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
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
        enum: ['admin', 'user'],
        default: 'user',
    },
},
    { timestamps: true },
    { strict: true }
);

// when password changes then hashed password is saved
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.password) {
        const hashedPassword = await bcrypt.hash(update.password, 10);
        this.setUpdate({ ...update, password: hashedPassword });
    }

    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;