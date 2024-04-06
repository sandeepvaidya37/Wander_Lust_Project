const express = require("express");
const router = express.Router( {});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/users.js");
const passport = require("passport");
const { SignUp } = require("../controllers/user.js");
const signUpControllers = require("../controllers/user.js");


router.get("/signup", wrapAsync(signUpControllers.SignUpUser));

router.post("/signup", wrapAsync(signUpControllers.signUpForm));

router.get("/login", wrapAsync(signUpControllers.loginUser));

router.post("/login", passport.authenticate('local', {failureRedirect: '/login', failureFlash:true }), wrapAsync(signUpControllers.loginForm));

router.get("/logout", signUpControllers.logOutUser);


module.exports=router;

