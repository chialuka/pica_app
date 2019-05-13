import { Users } from '../models';
import { hashPassword, generateToken } from '../utils';

const createUser = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const data = { ...req.body, password: hashedPassword };
    const newUser = await Users.create(data);
    const token = generateToken(newUser.id);
    return res.status(201).json({ data: { ...newUser, token } });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const token = generateToken(user.id);
    return res.status(200).json({ data: { ...user, token } });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { createUser, findUser, loginUser };
