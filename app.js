import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import spinner from "./design/ora.js"
import authRouters from "./authentications/routes/authroutes.js"
import userRouters from "./user-managements/routers/userRoutes.js"
import batchRouters from "./batch-management/routers/batchroute.js"
import studentRouters from "./students-management/routers/studentRoutes.js"
import database from "./config/database.js"
const app = express()
dotenv.config()
const PORT = process.env.PORT
// using middlewares
app.use(cors())
app.use(express.json())
app.use("/api/auth" , authRouters)
app.use("/api/officials" , userRouters)
app.use("/api/batchdetails" , batchRouters )
app.use("/api/studentdetails" , studentRouters)
// starting server
database()
app.listen(PORT,()=>{
console.log("⏱ Server..! Running..!");
spinner.start() 
})






