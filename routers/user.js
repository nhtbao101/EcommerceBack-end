const express = require("express");
const router = express.Router();

const { requestSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/secret/:userId", requestSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.param("userId", userById);

module.exports = router;
