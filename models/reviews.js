const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// models for revioes in listing website
// customers gives reviows about listing


 const reviewSchema=new Schema({
    comment:String,
    
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
 });

//  module.exports=moongoose.model("Review", reviewSchema);

 const Review = mongoose.model("Review", reviewSchema);
module.exports =Review;