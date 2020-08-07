import express from "express";
import { json } from "body-parser";
import cors from "cors";
import productRouter from "../routes/product";
import orderRouter from "../routes/order";
import userRouter from "../routes/auth";
import { join } from "path";

export class App {
  /**
   * @param port {number}
   */
  constructor(port) {
    this.app = express();

    this.setMiddlewares();
    this.app.listen(process.env.PORT || port);
  }

  /**
   * @private
   */
  setMiddlewares() {
    this.app.use(cors());

    this.app.use(json());
    this.app.use("/api/products", productRouter);

    this.app.use("/api/orders", orderRouter);

    this.app.use("/api/auth", userRouter);
    this.app.use("/static", express.static(join(__dirname, "../images")));
  }
}
