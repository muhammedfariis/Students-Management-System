import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
      type : String,
      required : true,
     
    },
    password : {
      type : String,
      required : true,
      min : 5 ,
      max : 50  
    },
    firstname : {
      type : String,
      required : true
    },
    lastname : {
       type : String
    },
    role : {
       type : String,
       required : true
    }

},{timestamps : true})

const users = mongoose.model("users" , userSchema)
export default users