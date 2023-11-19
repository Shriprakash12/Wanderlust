
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");



const userSchema=new Schema ({

    email:{
        type:String,
        required:true
    }
     
});



// User plugin autocally username password , hashing , salting provide krta hai pddf2 algorithm uses for hash

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);

