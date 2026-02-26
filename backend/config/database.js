import mongoose from "mongoose";

const connectDB = async ()=>{

 await mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("DataBase🍃");
})
.catch((errors)=>{
    console.log(errors ,"mongodb connection refused");
})
}

export default connectDB