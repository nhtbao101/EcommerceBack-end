const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helper/errDBHandler");

exports.signup = (req, res) => {
  console.log("req body", req.body);
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({
      user,
    });
  });
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "user with that email does not exits. Please signup.",
      });
    }
    if (user.encryptPassword(password) !== user.hashed_password) {
      return res.status(401).json({
        error: "User with password don't match!!!",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persit the tokent as "t" in cookies with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // response with user and token to frontend client
    const { _id, name, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  } catch (err) {
    res.json({ error: "Error !!" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ mes: "signout success " });
};

exports.requestSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  // auth is requestProperty
  let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: "Access dined !",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(404).json({
      error: "Admin resource, access dined !",
    });
  }
  next();
};
