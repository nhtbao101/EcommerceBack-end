const express = require("express");
const router = express.Router();
const { requestSignin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/secret/:userId", requestSignin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.param("userId", userById);

module.exports = router;
