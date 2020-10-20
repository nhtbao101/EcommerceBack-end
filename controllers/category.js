const Category = require("../models/category");
const { errorHandler } = require("../helper/errDBHandler");

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
