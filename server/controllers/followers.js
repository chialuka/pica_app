import { Followers } from '../models';

/**
 * @name createFollower
 * function for creating a new follower
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} JSON response with details of new follower created
 */
const createFollower = async (req, res) => {
  try {
    const { follower, following } = req.body;
    const follow = await Followers.findOne({
      where: { follower, following },
    });
    if (follow) {
      return res.status(409).json({ error: 'Already following user' });
    }
    const newFollow = await Followers.create(req.body);
    return res.status(201).json(newFollow);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @findFollower
 * function for finding all Followers of user with provided id
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json object with details of Followers searched for
 */
const findFollowers = async (req, res) => {
  try {
    const followers = await Followers.findAll({
      where: { following: req.params.id },
    });
    return res.status(200).json({ data: followers });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @findFollowing
 * function for finding users the user with provided id is following
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json object with details of users searched for
 */
const findFollowing = async (req, res) => {
  try {
    const following = await Followers.findAll({
      where: { follower: req.params.id },
    });
    return res.status(200).json({ data: following });
  } catch (error) {
    return res.status(500).json(error);
  }
};


/**
 * @name deleteFollowing
 * @async
 * function for deleting a follower
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json response with status of delete
 */
const deleteFollowing = async (req, res) => {
  try {
    const deleted = await Followers.destroy({
      where: { following: req.params.id },
    });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @name deleteFollower
 * @async
 * function for deleting a user following
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json response with status of delete
 */
const deleteFollower = async (req, res) => {
  try {
    const deleted = await Followers.destroy({
      where: { follower: req.params.id },
    });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  createFollower,
  findFollowers,
  findFollowing,
  deleteFollowing,
  deleteFollower,
};
