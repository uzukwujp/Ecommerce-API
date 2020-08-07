import Joi from "@hapi/joi";

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const validateSignInInput = (req) => {
  return schema.validate(req);
};
