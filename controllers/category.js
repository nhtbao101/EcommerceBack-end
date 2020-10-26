const Category = require("../models/category");
const { errorHandler } = require("../helper/errDBHandler");
const category = require("../models/category");

exports.categoryById = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    req.category = category;
    next();
  } catch (error) {
    return res.json({
      Message: "Category not exist !",
    });
  }
};

exports.create = async (req, res) => {
  try {
    // create new category like Category in model
    const category = await new Category(req.body);
    // save it
    //   console.log(category, req.body);
    category.save(category);
    res.json({ data });
  } catch (error) {
    return res.status(404).json({
      error: errorHandler(err),
    });
  }
};

exports.update = async (req, res) => {
  try {
    let category = await req.category;
    category.name = req.body.name;
    console.log("xx", category);
    category.save(category);
    res.json(category);
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    let category = await req.category;
    category.remove(category);
    {
      res.json({
        message: "Deleted !!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      err: "Category not exist ",
    });
  }
};

exports.list = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    let category = await Category.find()
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(category);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.read = (req, res) => {
  return res.json(req.category);
};
