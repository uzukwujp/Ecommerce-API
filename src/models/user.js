import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  shippingAddress: [addressSchema],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
