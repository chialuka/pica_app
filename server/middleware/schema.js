import Joi from '@hapi/joi';

const createUserSchema = {
  username: Joi.string()
    .alphanum()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  image: Joi.string(),
};

const loginUserSchema = {
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string()
    .alphanum()
    .required(),
};

const followerSchema = {
  follower: Joi.number().required(),
  following: Joi.number().required(),
};

const postSchema = {
  user: Joi.number().required(),
  text: Joi.string().max(160),
  image: Joi.string(),
};

export {
  createUserSchema, loginUserSchema, followerSchema, postSchema,
};
