const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");


module.exports.addReview = async(req,res, next)=>{

    let {id}= req.params;
   let listing=await Listing.findById(req.params.id);
   let newReview = await Review(req.body.review);
   
   listing.reviews.push(newReview);
  
   await newReview.save();
   await listing.save();
   req.flash('NewReview', 'New Review Added successfully!');
   res.redirect(`/listing/${id}`);
   
   
   
   };

   module.exports.deleteReview = async(req, res, next)=>{
    
    let {id, id2}=req.params;
    
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: id2}});
    await Review.findByIdAndDelete(id2);
    req.flash('NewReviewD', 'Review Deleted successfully!');
    res.redirect(`/listing/${id}`);
    
    
    };
