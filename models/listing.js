const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review= require("./reviews.js");

const listingSchema = new Schema({
    title: {
      type: String,
      required:true,
    },
    description: {
      type: String,
      required:true,
    },
    image: {
        filename: String,
        url: {
          type: String,
          required:true,
        }
      },
    price: {
      type:Number,
    },
    location: {
      type: String,
      required:true,
    },
    country: {
      type: String,
      required:true,
    },
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    owner:{
      type: Schema.Types.ObjectId,
      ref:"User",

    },
});

listingSchema.post("findOneAndDelete", async (Listing )=> {

  if  (Listing){
    await Review.deleteMany({_id : {$in: Listing.reviews}});
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;