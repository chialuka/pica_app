import { Users, Op } from '../models';
import { hashPassword, generateToken, comparePword } from '../utils';
import { createObject } from './images';

const createUser = async (req, res) => {
  try {
    const reqObject = JSON.parse(req.body.body);
    const { username, email, password } = reqObject;
    const name = await Users.findOne({ where: { username } });
    if (name) {
      return res.status(409).json({ error: 'Username in use' });
    }
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ error: 'Email in use' });
    }
    const hashedPassword = await hashPassword(password);
    const image = await createObject(username, req.file.buffer.toString('base64'));
    const data = { ...reqObject, password: hashedPassword, image };
    const newUser = await Users.create(data);
    delete newUser.dataValues.password;
    const token = generateToken(newUser.id);
    return res.status(201).json({ data: { ...newUser.dataValues, token } });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    delete user.dataValues.password;
    return res.status(200).json({ data: user.dataValues });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findUsers = async (_, res) => {
  try {
    const users = await Users.findAll();
    const response = users.map((item) => {
      const itemArray = item.dataValues;
      delete itemArray.password;
      return itemArray;
    });
    return res.status(200).json({ data: response });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const value = req.body.username || req.body.email;
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: value }, { email: value }],
      },
    });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect login details' });
    }
    const validPassword = comparePword(
      req.body.password,
      user.dataValues.password,
    );
    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect login details' });
    }
    delete user.dataValues.password;
    const token = generateToken(user.id);
    return res.status(200).json({ data: { ...user.dataValues, token } });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await Users.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  createUser, findUser, findUsers, loginUser, deleteUser,
};
