import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
 studentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "students",
    required : true
 },

 feeId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "fees",
    required : true
 },

 amount : {
    type : Number,
    required : true
 },

 method:{
    type : String,
    required : true
 }
 

},{timestamps : true})

const payment = mongoose.model("payment" , paymentSchema)

export default payment