import { Posts } from '../models';

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

const findPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findUserPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({ where: { user: req.params.id } });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    await Posts.destroy({ where: { id: req.params.id } });
    return res.status(204);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePosts = async (req, res) => {
  try {
    await Posts.destroyAll({ where: { id: req.params.id } });
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
