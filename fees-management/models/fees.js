import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({

    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "students",
        required : true
    },

    totalAmount : {
        type : Number,
        required : true
    },

    dueDate : {
        type : Date,
        required : true
    },

    discription : {
        type : String,
        required : true
    }

},{timestamps : true})

const fees = mongoose.model("fees" , feesSchema)

export default fees