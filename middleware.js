const Listing = require("./models/listing");

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){

        req.flash("singin", "You need to login first");
       return res.redirect("/login");
  
      }
      next();
};

module.exports.saveRedirectUrl = (req, res, nex)=>{
   if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
};

module.exports.isOwner = async(req, res, next)=>{

let { id } = req.params;
let listing = await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id))  {


    req.flash("ownerAuth", " You can't edit this Listing!");
    res.redirect(`http://localhost:8080/listing/${id}`);


};

next();


};