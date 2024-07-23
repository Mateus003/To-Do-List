import dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_KEY as string;
export const jwtExpiresIn = '1h'
