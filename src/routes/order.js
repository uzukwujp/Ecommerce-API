import { Router } from "express";
import {
  creatOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
} from "../controllers/order";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const orderRouter = Router();

orderRouter
  .route("/")
  .get([auth, admin, getAllOrders])
  .post([auth, creatOrder]);

orderRouter
  .route("/:id")
  .get([auth, admin, getOneOrder])
  .put([auth, admin, updateOneOrder]);

export default orderRouter;
