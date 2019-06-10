import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL);

sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  verifyCode: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
});

sequelize.define('followers', {
  follower: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  following: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

sequelize.define('posts', {
  user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.STRING,
  },
});

sequelize.sync({ force: true });
