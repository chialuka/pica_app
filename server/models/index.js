import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DB_URL);

const Users = sequelize.define('users', {
  userName: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  fullName: {
    type: Sequelize.STRING,
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

const Followers = sequelize.define('followers', {
  follower: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  following: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Posts = sequelize.define('posts', {
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

const { Op } = Sequelize;

export {
  Users, Followers, Posts, Op,
};
