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
import { jwtStrategy } from '../middleware/auth';

const jwt = jwtStrategy._strategies.jwt.name;

export default (router) => {
  router
    .route('/posts')
    .get(findPosts)
    .delete(deletePosts);

  router.route('/posts/create').post(
    upload.single('image'),
    validateRequest(postSchema),
    passport.authenticate(jwt, {
      session: false,
    }),
    createPost,
  );

  router
    .route('/posts/:id')
    .get(validateIdParams, findPost)
    .delete(
      validateIdParams,
      passport.authenticate(jwt, {
        session: false,
      }),
      deletePost,
    );

  router.route('/posts/user/:id').get(validateIdParams, findUserPosts);
};
