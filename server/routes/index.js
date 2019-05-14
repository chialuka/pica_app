import users from './users';
import followers from './followers';
import posts from './posts';

export default (router) => {
  users(router);
  followers(router);
  posts(router);
};
