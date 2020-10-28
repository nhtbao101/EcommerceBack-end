const express = require("express");
const router = express.Router();

const {
  create,
  read,
  producById,
  remove,
  update,
  list,
  relatedProduct,
} = require("../controllers/product");
const { userById } = require("../controllers/user");
const { requestSignin, isAdmin, isAuth } = require("../controllers/auth");
const { route } = require("./auth");

router.post("/product/create/:userId", requestSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.delete(
  "/product/:productId/:userId",
  requestSignin,
  isAdmin,
  isAuth,
  remove
);

router.put(
  "/product/:productId/:userId",
  requestSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get("/product/related/:productId", relatedProduct);

router.param("userId", userById);
router.param("productId", producById);

module.exports = router;
