import {
  createFollower,
  findFollowers,
  findFollowing,
  deleteFollower,
  deleteFollowing,
} from '../controllers/followers';
import { validateRequest, validateIdParams } from '../middleware/validators';
import {} from '../middleware/schema';

export default (router) => {
  router
    .route('/followers/create')
    .post(validateRequest(createFollower), createFollower);

  router
    .route('/followers/:id')
    .get(validateIdParams, findFollowers)
    .delete(validateIdParams, deleteFollower);

  router
    .route('/following/:id')
    .get(validateIdParams, findFollowing)
    .delete(validateIdParams, deleteFollowing);
};
