import mongoose from "mongoose";

const attentenceSchema = new mongoose.Schema({

    batchId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "batch",
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    records : [
        {
            studentId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'students',
                required : true
            },
            status : {
                type : String,
                enum : ["present" , "absent" , "Excused" , "Halfday - Late","Half Day - Early Exit"],
                required : true 
            }
        }
    ]

},{timestamps : true})

const attendence = mongoose.model("attendence" , attentenceSchema)

export default attendence