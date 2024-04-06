const express = require("express");
const router = express.Router( {mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const reviewControler = require("../controllers/review.js");




const validatedReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };



//reviews
router.post("/", validatedReview, wrapAsync(reviewControler.addReview ));
    
//deleteReview
    
 router.post("/:id2", wrapAsync(reviewControler.deleteReview));

    module.exports=router;