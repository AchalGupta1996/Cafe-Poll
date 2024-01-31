//name,rating,avg rating,phone,total ratings
//define schema in this file.

const mongoose = require("mongoose");

const objectSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    reviewSum:{
        type:Number,
        required:true
    },
    reviewCount:{
        type:Number,
        required:true
    }

});

module.exports= mongoose.model("object",objectSchema) //objects in mongo atlas