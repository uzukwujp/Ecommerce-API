import Joi, { array } from "@hapi/joi";

const itemSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
});

const schema = Joi.object({
  issuer: Joi.string().required(),
  orderedItems: Joi.array().items(itemSchema),
  numberOfItems: Joi.number().required(),
  totalSum: Joi.number().required(),
  deliveredAt: Joi.date(),
  receivedPayment: Joi.date(),
});

export const validateOrderInput = (order) => {
  return schema.validate(order);
};
