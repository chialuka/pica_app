import users from './users';
import followers from './followers';

export default (router) => {
  users(router);
  followers(router);
};
