import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL);

sequelize.define('users', {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: true,
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
}).sync({ force: true });

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

export default sequelize;
