const Category = require("../models/category");
const { errorHandler } = require("../helper/errDBHandler");
const category = require("../models/category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.json({
        Message: "Category not exist !",
      });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  // create new category like Category in model
  const category = new Category(req.body);
  // save it
  //   console.log(category, req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(404).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.update = (req, res) => {
  let category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        err: "Category not exist ",
      });
    }
    res.json({
      message: "Deleted !!",
    });
  });
};

exports.list = (req, res) => {
  console.log(req.query);
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};
