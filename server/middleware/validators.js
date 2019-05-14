import Joi from '@hapi/joi';

const validateRequest = schema => async (req, res, next) => {
  const validate = await Joi.validate(req.body, schema, {
    abortEarly: true,
  });
  const errors = validate.details.map(x => x.message.replace(/([\\"])/g, ''));
  if (!validate) {
    return res.status(400).json({
      status: 400,
      errors,
    });
  }
  return next();
};

const validateIdParams = (req, res, next) => {
  const isInvalid = /[^\d]/g.test(req.params.id);
  if (isInvalid) {
    return res.status(400).json({
      status: 400,
      error: 'Provided id is invalid. Please provide a positive integer',
    });
  }
  return next();
};

export { validateRequest, validateIdParams };
