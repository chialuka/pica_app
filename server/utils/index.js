import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const hashPassword = async password => bcrypt.hash(password, 8);

const comparePword = async (pword, hashed) => bcrypt.compare(pword, hashed);

const generateToken = id => jwt.sign({ id }, SECRET, { expiresIn: '1h' });

export { hashPassword, comparePword, generateToken };
