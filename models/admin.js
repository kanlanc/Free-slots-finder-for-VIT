var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var adminSchema=new mongoose.Schema({
    username:String,
    password:String
});

adminSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("admin",adminSchema);