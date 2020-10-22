const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product");
const { userById } = require("../controllers/user");
const { requestSignin, isAdmin, isAuth } = require("../controllers/auth");

router.post("/product/create/:userId", requestSignin, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;
