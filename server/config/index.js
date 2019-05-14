import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL);

export default sequelize;
