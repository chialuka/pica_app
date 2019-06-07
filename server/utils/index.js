import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const { SECRET } = process.env;

/**
 * function for generating email verification code
 * @name generateCode
 * @param {String} user
 * @returns {String} sha256 hash created to verify email
 */
const generateCode = user => crypto
  .createHmac('sha256', SECRET)
  .update(user)
  .digest('hex');

/**
 * function for hashing password
 * @name hashPassword
 * @param {String} password
 * @returns {String} hashed password
 */
const hashPassword = async password => bcrypt.hash(password, 8);

/**
 * function for comparing password
 * @name comparePassword
 * @param {String} pword
 * @param {String} hashed
 * @returns {Boolean} boolean indicating whether passwords match
 */
const comparePassword = async (pword, hashed) => bcrypt.compare(pword, hashed);

/**
 * function for generating json web token
 * @name generateToken
 * @param {String} id
 * @return {String} token generated
 */
const generateToken = id => jwt.sign({ id }, SECRET, { expiresIn: '1h' });

export {
  generateCode, hashPassword, comparePassword, generateToken,
};
