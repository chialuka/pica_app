import passport from 'passport';
import {
  createUser,
  findUser,
  findUsers,
  deleteUser,
  loginUser,
  verifyUser,
} from '../controllers/users';
import { createUserSchema, loginUserSchema } from '../middleware/schema';
import { validateRequest, validateIdParams } from '../middleware/validators';
import upload from '../middleware/images';
import { jwtStrategy } from '../middleware/auth';

export default (router) => {
  router.route('/users').get(findUsers);

  router
    .route('/users/signup')
    .post(
      upload.single('image'),
      validateRequest(createUserSchema),
      createUser,
    );

  router.route('/users/verifyEmail/:email/:verifyCode').patch(verifyUser);

  router
    .route('/users/login')
    .post(validateRequest(loginUserSchema), loginUser);

  router
    .route('/users/:id')
    .get(validateIdParams, findUser)
    .delete(
      validateIdParams,
      passport.authenticate(jwtStrategy._strategies.jwt.name, {
        session: false,
      }),
      deleteUser,
    );
};
