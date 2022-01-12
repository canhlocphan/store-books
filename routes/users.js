var express = require("express");
var router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user.controller");
const { authNotLogin, isAuthenticated } = require('../middlewares/auth.mdw');

// home
router.get("/", isAuthenticated, userController.getAccountInfo);

// login
router.get("/login", authNotLogin, userController.login);
router.post("/login", authNotLogin, userController.postLogin);
router.post("/login", authNotLogin,
  passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
);

// register
router.get("/register", authNotLogin, userController.register);
router.post("/register", authNotLogin, userController.addNewAccount);

// logout
router.get("/logout", userController.logout);

router.get("/order", isAuthenticated, userController.renderOrderHistory)

module.exports = router;