import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

const sequelize = new Sequelize(DB_URL);

const Users = sequelize.define('users', {
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
  profilePicture: {
    type: Sequelize.BLOB,
  },
});

const Followers = sequelize.define('followers', {
  follower: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  following: {
    type: Sequelize.STRING,
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
    type: Sequelize.BLOB,
  },
});

sequelize.sync({ force: true });

export { Users, Followers, Posts };
