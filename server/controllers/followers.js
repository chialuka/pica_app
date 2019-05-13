import { Followers } from '../models';

const createFollower = async (req, res) => {
  try {
    const newFollow = await Followers.create(req.body);
    return res.status(201).json(newFollow);
  } catch (error) {
    return res.status(500).json(error)
  }
}

const findFollowers = async (req, res) => {
  try {
    const followers = await Followers.findAll({
      where: { follower: req.body.user },
    });
    return res.status(200).json({ data: followers });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findFollowing = async (req, res) => {
  try {
    const following = await Followers.findAll({
      where: { following: req.body.user },
    });
    return res.status(200).json({ data: following });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteFollowing = async (req, res) => {
  try {
    const deleted = await Followers.destroy({ where: { following: req.params.id } });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error)
  }
};

const deleteFollower = async (req, res) => {
  try {
    const deleted = await Followers.destroy({ where: { follower: req.params.id }});
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export { createFollower, findFollowers, findFollowing, deleteFollowing, deleteFollower };
