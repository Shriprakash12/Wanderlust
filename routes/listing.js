

const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js");


const Listing=require("../models/listing.js");

const  {isLoggedIn, validateListing, isOwner}=require("../middleware.js");
const multer=require("multer");

const listingController=require("../controllers/listings.js");
const {storage}=require("../cloudConfig.js");

const upload=multer({storage});




  

//  router.route is used to reduce number of callback with same path
router.route("/")
.get( wrapAsync (listingController.index))
.post( isLoggedIn, 
upload.single("listing[image]"),
wrapAsync(listingController.createListing)
  );
 

  router.get("/new", isLoggedIn ,listingController.renderNewForm);

 router.route("/:id")
 .get( wrapAsync(listingController.showListing)
  )
  .put(isLoggedIn ,isOwner,
    upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing)
  )
  .delete( isLoggedIn ,isOwner,wrapAsync(listingController.destroyListing)
  );
 
  
  //New Route
  
  //Show Route
 
  
  //Create Route
  
  // joi is npm package to validate the 
  // schema of database and javascript
  // to install npm i joi 

  
  //Edit Route
  router.get("/:id/edit",isLoggedIn , isOwner,wrapAsync(listingController.renderEditForm)
  );
  
  //Update Route
 
  
  //Delete Route
 

  module.exports=router;
  