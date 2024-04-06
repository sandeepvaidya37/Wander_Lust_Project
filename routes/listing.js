const express = require("express");
const router = express.Router( {mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });



const validatedListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (!error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };
  
 
//showalllisting
router.get("/",  wrapAsync(listingController.index));
//rendernewform
router.get("/new", isLoggedIn, listingController.renderNewForm);
//addnewlisting
router.post("/", upload.single('listing[image]'),  validatedListing, wrapAsync( listingController.addNewListing));
//updatelisting
router.put("/:id",isLoggedIn,  upload.single('listing[image]'), isOwner, validatedListing, wrapAsync( listingController.updateListing));
//editListing
router.get("/:id/edit", isLoggedIn, validatedListing, wrapAsync(listingController.editListing));
//DeleteListing
router.delete("/:id", isLoggedIn, validatedListing, wrapAsync(listingController.deleteListing));
//showListing
router.get("/:id", validatedListing, wrapAsync(listingController.showListing));


module.exports = router;

