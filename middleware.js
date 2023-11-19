

const Listing=require("./models/listing");

const Review=require("./models/reviews");
const {listingSchema, reviewSchema}=require("./schema.js");

const passport=require("passport-local");
const ExpressError=require("./utils/ExpressError.js");
module.exports.isLoggedIn=(req,res,next) =>{

    if(!req.isAuthenticated()){
      // req redirect
      req.session.redirectUrl=req.originalUrl;
        req.flash("error", "you must be logged in to create listing !");
        res.redirect("/login"); 
      }

      next();
};

module.exports.saveRedirectUrl =(req, res, next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl; 
  }

  next();
}



// this function only owner can make the changes 

// middleware hai jo isowner function ko implement kr rha hai

module.exports.isOwner= async (req, res ,next) =>{

  let { id } = req.params;

    // update only owner not any other person
    let listing=await Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id)){

      req.flash("error", "You are not the owner of  this listing ");
     return  res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports. validateListing=(req,res,next) =>{
  let {error}=listingSchema.validate(req.body);
  
  if(error){
    let errmsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, error);
  }else{
    next();
  }
};


module.exports.validateReview=(req,res,next) =>{
  let {error}=reviewSchema.validate(req.body);
  
  if(error){
    let errmsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, error);
  }else{
    next();
  }
};



// for delete is author checking


module.exports.isReviewAuthor= async (req, res ,next) =>{

  let { id,reviewId } = req.params;

    // update only owner not any other person
    let review=await Review.findById(reviewId);

    if(!review.author._id.equals(res.locals.currUser._id)){

      req.flash("error", "You are not the author of this review! ");
     return  res.redirect(`/listings/${id}`);
    }

    next();
};




