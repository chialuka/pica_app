import {
  findPosts,
  deletePosts,
  createPost,
  findPost,
  findUserPosts,
  deletePost,
} from '../controllers/posts';
import { postSchema } from '../middleware/schema';
import { validateRequest, validateIdParams } from '../middleware/validators';

export default (router) => {
  router
    .route('/posts')
    .get(findPosts)
    .delete(deletePosts);

  router.route('/posts/create').post(validateRequest(postSchema), createPost);

  router
    .route('/posts/:id')
    .get(validateIdParams, findPost)
    .delete(validateIdParams, deletePost);

  router.route('/posts/user/:id').get(validateIdParams, findUserPosts);
};
