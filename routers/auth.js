const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const {
  signup,
  signin,
  signout,
  requestSignin,
} = require("../controllers/auth");
const { userValidator, resultValidate } = require("../validator/index");

router.post("/signup", [userValidator, resultValidate], signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/hello", requestSignin, (req, res) => {
  res.send("hello");
});

module.exports = router;
