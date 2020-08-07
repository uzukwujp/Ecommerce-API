import Joi from "@hapi/joi";

const schema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  amountInStock: Joi.number().required(),
});

export const validateProductInput = (product) => {
  return schema.validate(product);
};
