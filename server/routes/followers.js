import {
  createFollower,
  findFollowers,
  findFollowing,
  deleteFollower,
  deleteFollowing,
} from '../controllers/followers';

export default (router) => {
  router.route('/followers/create').post(createFollower);

  router
    .route('/followers/:id')
    .get(findFollowers)
    .delete(deleteFollower);

  router
    .route('/following/:id')
    .get(findFollowing)
    .delete(deleteFollowing);
};
