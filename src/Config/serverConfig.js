import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3100;


export const MONGO_URL = process.env.MONGO_URL || 'devlopment';

export const JWT_SECRET = process.env.JWT_SECRET ;

export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';