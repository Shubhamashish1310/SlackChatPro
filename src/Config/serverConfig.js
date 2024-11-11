import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3100;


export const MONGO_URL = process.env.MONGO_URL || 'devlopment';

