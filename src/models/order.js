import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  issuer: { type: String, required: true },
  orderedItems: [
    new mongoose.Schema({
      title: { type: String, required: true },
      price: { type: Number, required: true },
    }),
  ],
  totalSum: { type: Number, required: true, min: 0 },
  numberOfItems: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now() },
  deliveredAt: { type: Date },
  receivedPayment: { type: Date },
});

export default mongoose.model("Order", orderSchema);
