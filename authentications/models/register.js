import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({

  username : {
    type : String,
    required : true
  },

  phone : {
    type : Number,
    required : true
  },

  age : {
    type : Number,
    required : true,
    min  : 1,
    max : 21

  },

  email : {
    type : String,
    required : true ,
    unique : true,
    match : [/^[a-zA-Z0-9.%+_-]+@gmail\.com$/ , "only unique gmail"]
  },
  
  password : {
   type : String,
   required : true,
   min : 8,
   max : 15
  }

},{timestamps : true})


const register = mongoose.model("authentications" , registerSchema)

export default register