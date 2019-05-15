import multer from 'multer';
import {
  createUser,
  findUser,
  findUsers,
  deleteUser,
  loginUser,
} from '../controllers/users';
import { createUserSchema, loginUserSchema } from '../middleware/schema';
import { validateRequest, validateIdParams } from '../middleware/validators';

const upload = multer();

export default (router) => {
  router.route('/users').get(findUsers);

  router
    .route('/users/signup')
    .post(
      upload.single('image'),
      validateRequest(createUserSchema),
      createUser,
    );

  router
    .route('/users/login')
    .post(validateRequest(loginUserSchema), loginUser);

  router
    .route('/users/:id')
    .get(validateIdParams, findUser)
    .delete(validateIdParams, deleteUser);
};
