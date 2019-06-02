import passport from 'passport';
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
import upload from '../middleware/images';
// import { jwtStrategy } from '../middleware/auth';

export default (router) => {
  router
    .route('/posts')
    .get(passport.authenticate('jwt', { session: false }), findPosts)
    .delete(deletePosts);

  router
    .route('/posts/create')
    .post(upload.single('image'), validateRequest(postSchema), createPost);

  router
    .route('/posts/:id')
    .get(validateIdParams, findPost)
    .delete(validateIdParams, deletePost);

  router.route('/posts/user/:id').get(validateIdParams, findUserPosts);
};
