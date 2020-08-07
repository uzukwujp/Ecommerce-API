import Product from "../models/product";
import { validateProductInput } from "../inputValidations/product";
import { unlink } from "fs";
import { promisify } from "util";
import { join } from "path";

const promisifiedUnlink = promisify(unlink);

export const createProduct = async (req, res) => {
  try {
    const { error } = validateProductInput(req.body);
    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }
    const fileNames = req.files.map((x) => {
      return x.filename;
    });
    const product = new Product({
      title: req.body.title,
      category: req.body.category,
      price: Number(req.body.price),
      amountInStock: Number(req.body.amountInStock),
      fileNames: fileNames,
    });
    const result = await product.save();
    res.status(201).json({ products: result });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const currentPage = Number(req.query.page) || 1;
    const perPage = 2;
    let totalDocument;
    const count = await Product.countDocuments();
    totalDocument = count;
    const products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    products.map((product) => {
      product.urls = product.creatProductUrls();
    });

    if (products) {
      res.status(200).json({ product: products, totalDocument: totalDocument });
    } else {
      return res.status(400).json({ errorMessage: "invalid page number" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    product.urls = product.creatProductUrls();
    if (product) {
      res.status(200).json({ product: product });
    } else {
      res.status(400).json({ errorMessage: "invalid product id" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const modifyOneProduct = async (req, res) => {
  try {
    req.body.price = Number(req.body.price);
    req.body.amountInStock = Number(req.body.amountInStock);

    const { error } = validateProductInput(req.body);

    if (error) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }
    let product = {};

    if (req.files) {
      (product.title = req.body.title),
        (product.category = req.body.category),
        (product.price = req.body.price),
        (product.amountInStock = req.body.amountInStock),
        (product.fileNames = req.files.map((file) => {
          return file.filename;
        }));
    } else {
      (product.tile = req.body.title),
        (product.price = req.body.price),
        (product.category = req.body.category),
        (product.amountInStock = req.body.amountInStock);
    }

    const result = await Product.findOneAndUpdate(
      { _id: req.params.id },
      product,
      {
        new: true,
        upsert: true,
      }
    );
    console.log(result);
    if (result) {
      res
        .status(200)
        .json({ message: "product updated successfully", product: result });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};

export const deleteOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    let fileNames;
    if (product) {
      fileNames = product.fileNames.map((x) => {
        return x;
      });

      await promisifiedUnlink(join(__dirname, `../images/${fileNames[0]}`));
      await promisifiedUnlink(join(__dirname, `../images/${fileNames[1]}`));
      await promisifiedUnlink(join(__dirname, `../images/${fileNames[2]}`));
      await promisifiedUnlink(join(__dirname, `../images/${fileNames[3]}`));
    } else {
      return res.status(400).json({ errorMessage: "invalid id" });
    }
    const result = await Product.findOneAndDelete({ _id: req.params.id });

    if (result) {
      res
        .status(200)
        .json({ message: "product successfully deleted", product: result });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};
