import Joi from "@hapi/joi";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "dev", "com.ng"] },
    })
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phoneNumber: Joi.number().required(),
  isAdmin: Joi.boolean(),
  street: Joi.string().required(),
  country: Joi.string().required(),
});

export const validateUserInput = (user) => {
  return schema.validate(user);
};
