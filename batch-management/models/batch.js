import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  name :{
    type : String,
    required : true,
  },
  coursename : {
    type : String,
    required : true
  },
  instructorid : {
    type : String,
    required : true
  },
  startdate : {
    type : Date,
    required : true
  },
  capacity : {
    type : Number,
    required : true
  }

} , {timestamps : true})

const batch = mongoose.model("batches" , batchSchema)
export default batch