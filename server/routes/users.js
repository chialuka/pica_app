import { createUser, findUser } from '../controllers/users';

export default (router) => {
  router.route('/users/:id').get(findUser);
  router.route('/users/signup').post(createUser);
};
