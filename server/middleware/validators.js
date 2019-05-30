import Joi from '@hapi/joi';

/**
 * @name validateRequest
 * validator function for the request body payload
 * @async
 * @param {Object} schema
 * @returns {JSON} Json response with errors from validation
 */
const validateRequest = schema => async (req, res, next) => {
  try {
    const payload = req.body.body || req.body;
    await Joi.validate(payload, schema, { abortEarly: true });
    return next();
  } catch (error) {
    const errors = error.details.map(x => x.message.replace(/([\\"])/g, ''));
    return res.status(400).json({
      status: 400,
      errors,
    });
  }
};

/**
 * @name validateIdParams
 * validator function for the ID provided in the request object
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Function} function that calls the next middleware
 */
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
