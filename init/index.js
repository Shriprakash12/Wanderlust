
// require the moongoose
const mongoose=require("mongoose");
const initData=require("./data.js");

const Listing=require("../models/listing.js");

// make connection with mongoose

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
console.log("connected to DB");
})
.catch((err)=>{
console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB= async() =>{
    await Listing.deleteMany({});
     
    initData.data=initData.data.map((obj) => ({
        ...obj, owner:"655597948b737f3253565f46",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
};


initDB();
