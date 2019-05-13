import {
  createUser,
  findUser,
  findUsers,
  deleteUser,
  loginUser,
} from '../controllers/users';

export default (router) => {
  router.route('/users').get(findUsers);

  router.route('/users/signup').post(createUser);

  router.route('/users/login').post(loginUser);

  router
    .route('/users/:id')
    .get(findUser)
    .delete(deleteUser);
};
