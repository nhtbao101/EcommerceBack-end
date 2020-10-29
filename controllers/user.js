const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found !",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = async (req, res) => {
  try {
    req.profile.salt = undefined;
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
  } catch (error) {
    return res.status(400).json({
      error: "User not found !",
    });
  }
};

exports.update = async (req, res) => {
  try {
    let user = User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    );
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: "Update not successully !",
    });
  }
};
