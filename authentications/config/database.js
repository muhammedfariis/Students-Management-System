import mongoose from "mongoose";

const connectDB = async ()=>{

 await mongoose.connect(process.env.MONGO_URL)
.then((succeed)=>{
    console.log("DataBase🍃");
})
.catch((errors)=>{
    console.log(errors ,"mongodb connection refused");
})
}

export default connectDB