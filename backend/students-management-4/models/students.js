            import mongoose from "mongoose";

            const studentSchema = new mongoose.Schema({
            email : {
                type : String,
                required : true ,
                match :  [/^[a-zA-Z0-9.%+_-]+@gmail\.com$/ , "only unique gmail"]
            },
            password : {
                type : String,
                required : true,
                min : 4 ,
                max : 25
            },
            firstName : {
                type : String,
                required : true
            },
            lastName : {
                type : String,
                required : true
            },
            phone : {
                type : Number,
                required : true
            },
            batchID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "batches",
            default: null
             },

            role : {
                type : String,
                default : "student"
            }
        

            },{timestamps : true})

        const students = mongoose.model("students" , studentSchema)
        export default students
