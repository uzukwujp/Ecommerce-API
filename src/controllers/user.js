import bcrypt from "bcrypt";
import User from "../models/user";
import { validateUserInput } from "../inputValidations/user";
import { validateSignInInput } from "../inputValidations/signIn";
import jwt from "jsonwebtoken";
import config from "config";

export const signUp = async (req, res) => {
  try {
    const { error } = validateUserInput(req.body);
    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
      isAdmin: req.body.isAdmin,
      shippingAddress: [{ street: req.body.street, country: req.body.country }],
    });

    const result = await user.save();
    if (result) {
      res.status(201).json({ message: "registration successful" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "something happened" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = validateSignInInput(req.body);
    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ errorMessage: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.get("jwt_secret"),
      { expiresIn: "24h" }
    );

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ errorMessage: "something happened!" });
  }
};
