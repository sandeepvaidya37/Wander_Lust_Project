const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewsSchema = new Schema({
    comment: String,
    user: String,
    rating:{
        type:Number,
        min: 0,
        max:5
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Review", reviewsSchema);
