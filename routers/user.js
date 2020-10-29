const express = require("express");
const router = express.Router();

const { requestSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");

router.get("/secret/:userId", requestSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
// router.get("/user/:userId", read);
// router.put("/user/:userID", update);

router.param("userId", userById);

module.exports = router;
