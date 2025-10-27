import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import spinner from "./authentications/design/ora.js"
import routers from "./authentications/routes/authroutes.js"
import database from "./authentications/config/database.js"
const app = express()
dotenv.config()
const PORT = process.env.PORT
// using middlewares
app.use(cors())
app.use(express.json())
app.use("/api/auth" , routers)
// starting server
database()
app.listen(PORT,()=>{
console.log("⏱ Server..! Running..!");
spinner.start() 
})






