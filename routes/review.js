
const express=require("express");
const router=express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js");
 
 
const Review = require("../models/reviews.js");
const Listing=require("../models/listing.js");

const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");

const passport=require("passport-local");


const reviewController=require("../controllers/reviews.js");




// const listings=require("../routes/listing.js");



// Revies 
// Post Route for Reviews 
router.post("/", isLoggedIn,  validateReview ,wrapAsync(reviewController.createReview)
  );


  // Delete Review Route


router.delete("/:reviewId",isLoggedIn,isReviewAuthor ,  wrapAsync (reviewController.destroyReview));

module.exports=router;