const formidable = require("formidable");
const fs = require("fs");
const lodash = require("lodash");
const errorHandler = require("../helper/errDBHandler");
const Product = require("../models/product");
const { resolveSoa } = require("dns");
const product = require("../models/product");

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(files.photo);
    if (err) {
      return res.status(400).json({
        error: "Image cound not be uploaded",
      });
    }

    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required ",
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1Mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.producById = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);
    req.product = product;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Product not found !",
    });
  }
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = async (req, res) => {
  try {
    let product = await req.product;
    product.remove(product).then(() => {
      res.json({
        Message: "Product delete successfully",
      });
    });
  } catch (error) {
    return res.json({
      error: errorHandler(err),
    });
  }
};

exports.update = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(files.photo);
      console.log("filed : -----", fields);
      if (err) {
        return res.status(400).json({
          error: "Image cound not be uploaded",
        });
      }

      const { name, description, price, category, quantity, shipping } = fields;
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: "All fields are required ",
        });
      }

      let product = req.product;
      product = lodash.extend(product, fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1Mb",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(product);
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.list = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    const productList = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit);
    return res.send(productList);
  } catch (err) {
    return res.status(400).json({
      err: err,
    });
  }
};
