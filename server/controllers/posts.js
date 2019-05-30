import { Posts } from '../models';

/**
 * @name createPost
 * function for creating a new post
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} JSON response with details of new post created
 */
const createPost = async (req, res) => {
  try {
    if (!req.body.text && !req.body.image) {
      return res.status(400).json({ error: 'Include either text or image' });
    }
    const post = await Posts.create(req.body);
    return res.status(201).json({ data: post });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @findPost
 * function for finding post with provided id
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json object with details of post searched for
 */
const findPost = async (req, res) => {
  try {
    const post = await Posts.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @name findPosts
 * @async
 * function for finding all posts
 * @param {Object} _
 * @param {Object} res
 * @returns {JSON} Json object containing all posts in the database
 */
const findPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @name findUserPosts
 * @async
 * function for finding all posts made by a specific user
 * @param {Object} _
 * @param {Object} res
 * @returns {JSON} Json object containing posts made by user
 */
const findUserPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({ where: { user: req.params.id } });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @name deletePost
 * @async
 * function for deleting a Post
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json response with status of delete
 */
const deletePost = async (req, res) => {
  try {
    await Posts.destroy({ where: { id: req.params.id } });
    return res.status(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * @name deletePost
 * @async
 * function for deleting all posts made by a user
 * @param {Object} req
 * @param {Object} res
 * @returns {JSON} Json response with status of delete
 */
const deletePosts = async (req, res) => {
  try {
    await Posts.destroyAll({ where: { user: req.params.id } });
    return res.status(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  createPost,
  findPost,
  findPosts,
  findUserPosts,
  deletePost,
  deletePosts,
};
