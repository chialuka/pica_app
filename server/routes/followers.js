import passport from 'passport';
import {
  createFollower,
  findFollowers,
  findFollowing,
  deleteFollower,
  deleteFollowing,
} from '../controllers/followers';
import { validateRequest, validateIdParams } from '../middleware/validators';
import { followerSchema } from '../middleware/schema';
import '../middleware/passport';

export default (router) => {
  router.route('/followers/create').post(
    validateRequest(followerSchema),
    passport.authenticate('jwt', {
      session: false,
    }),
    createFollower,
  );

  router
    .route('/followers/:id')
    .get(
      validateIdParams,
      passport.authenticate('jwt', {
        session: false,
      }),
      findFollowers,
    )
    .delete(
      validateIdParams,
      passport.authenticate('jwt', {
        session: false,
      }),
      deleteFollower,
    );

  router
    .route('/following/:id')
    .get(
      validateIdParams,
      passport.authenticate('jwt', {
        session: false,
      }),
      findFollowing,
    )
    .delete(
      validateIdParams,
      passport.authenticate('jwt', {
        session: false,
      }),
      deleteFollowing,
    );
};
