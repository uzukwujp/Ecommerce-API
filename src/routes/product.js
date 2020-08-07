import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  modifyOneProduct,
  deleteOneProduct,
} from "../controllers/product";
import multer from "../middleware/multer";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const productRouter = Router();

productRouter
  .route("/")
  .get([auth, getAllProducts])
  .post([auth, admin, multer, createProduct]);

productRouter
  .route("/:id")
  .get([auth, getOneProduct])
  .put([auth, admin, multer, modifyOneProduct])
  .delete([auth, admin, deleteOneProduct]);

export default productRouter;
