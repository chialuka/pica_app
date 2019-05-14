import {
  findPosts,
  deletePosts,
  createPost,
  findPost,
  findUserPosts,
  deletePost,
} from '../controllers/posts';

export default (router) => {
  router
    .route('/posts')
    .get(findPosts)
    .delete(deletePosts);

  router.route('/posts/create').post(createPost);

  router
    .route('/posts/:id')
    .get(findPost)
    .delete(deletePost);

  router.route('/posts/user/:id').get(findUserPosts);
};
