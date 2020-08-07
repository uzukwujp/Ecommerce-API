import Order from "../models/order";
import { validateOrderInput } from "../inputValidations/order";

export const creatOrder = async (req, res) => {
  try {
    const { error } = validateOrderInput(req.body);
    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }

    const order = new Order({
      issuer: req.body.issuer,
      orderedItems: req.body.orderedItems,
      totalSum: req.body.totalSum,
      numberOfItems: Number(req.body.numberOfItems),
    });

    const result = await order.save();
    res
      .status(201)
      .json({ message: "order successfully placed", order: result });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const currentPage = Number(req.query.page) || 1;
    const perPage = 2;
    let totalDocuments = await Order.countDocuments();
    const orders = await Order.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({ orders: orders, totalDocuments: totalDocuments });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(400).json({ errorMessage: "Invalid order Id" });
    }
    res.status(200).json({ order: order });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const updateOneOrder = async (req, res) => {
  try {
    const { error } = validateOrderInput(req.body);
    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }
    let order = await Order.findOne({ _id: req.params.id });
    order.issuer = req.body.issuer;
    order.orderedItems = req.body.orderedItems;
    order.totalSum = Number(req.body.totalSum);
    order.numberOfItems = Number(req.body.numberOfItems);
    order.deliveredAt = new Date(req.body.deliveredAt);
    order.receivedPayment = new Date(req.body.receivedPayment);

    const result = await Order.findOneAndUpdate({ _id: req.params.id }, order, {
      new: true,
      upsert: true,
    });
    if (result) {
      res.status(200).json({ message: "successfully updated", order: result });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};
