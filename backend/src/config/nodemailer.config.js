import nodemailer from 'nodemailer';
import { EMAIL_ID, EMAIL_PASS } from './server-config.js';

const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASS
    }
});

export default sender;