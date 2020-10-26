const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  update,
  remove,
  list,
  read,
} = require("../controllers/category");
const { requestSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requestSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", read);

router.put(
  "/category/:categoryId/:userId",
  requestSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requestSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/categorys", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
