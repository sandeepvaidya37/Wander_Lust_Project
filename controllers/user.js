const User = require("../models/users.js");

module.exports.SignUpUser = async(req, res)=>{

    res.render("./users/signup.ejs");
};
module.exports.signUpForm = async(req, res)=>{

    try {
        
        let {username, email, password}=req.body;
    const NewUser=User({email, username, password});
    const registerUser= await  User.register(NewUser, password);
    req.login(registerUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("UserSuccess", "User was Registered successfully");
    res.redirect("/listing");
    });
    


    } catch (error) {
        
        req.flash("usererror", error.message);
        res.redirect("/signup");
    }

};

module.exports.loginUser = async(req, res)=>{

    res.render("./users/login.ejs");

};
module.exports.loginForm = async(req, res)=>{

    req.flash("userLogin", "Welcome to wanderlust");
    res.redirect("/listing");
 
 
 };
 //module.exports.logOutUser = (req , res, next)=>{


   // req.logout((err)=>{
      //  if(err){
      //      next(err);
       // }
      // req.flash("logout", "You logged Out Successfuly!");
   // });
//};
module.exports.logOutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); // Pass any error to the next middleware
        }
        req.flash("logout", "You logged Out Successfuly!");
        res.redirect("/listing");
    });
};