import { config } from 'dotenv';

config();

export const DB_URL = process.env.DB_URL;
export const secret = process.env.secret;
