var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    name:String,
    reg:String,
    slots:[{
        type:Number
    }]
});



module.exports=mongoose.model("User",userSchema);
