
 // wrapaysnc funcgion is used to handle the error with async functin


 // aynnc function return the function
 // function inside the function
 // make choti cheej ko complex

 // we can remove the try and catch block




 function asyncWrap(fn) {
    return function (req,res,next){
        fn(req,res,next).catch((err)=> next(err));
    };
 }

 module.exports=asyncWrap;