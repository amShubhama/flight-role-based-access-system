import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASS = process.env.EMAIL_PASS;
const JWT_SECRET_CODE = process.env.JWT_SECRET_CODE;

export { PORT, DBURI, EMAIL_ID, EMAIL_PASS, JWT_SECRET_CODE }