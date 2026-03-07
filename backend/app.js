import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import spinner from "./design/ora.js"
import authRouters from "./routes/authroutes.js"
import userRouters from "./routes/userRoutes.js"
import routerRole from "./routes/roles.js"
import actionRouter from "./routes/action.js"
// import batchRouters from "./batch-management-3/routers/batchroute.js"
// import studentRouters from "./students-management-4/routers/studentRoutes.js"
// import stdinbatch from "./students-in-batches-5/routers/batchRoute.js"
// import Attendence from "./attendence-marker-6/routers/att_routers.js"
// import Feeses from "./fees-management-7/routers/fee_router.js"
// import reportses from "./reports/routers/reportes.js"
// import cron from "./auto/croning.js"
import database from "./config/database.js"
const app = express()
dotenv.config()
const PORT = 8080
// using middlewares
app.use(cors())
app.use(express.json())
app.use("/api/auth" , authRouters)
app.use("/api/officials" , userRouters)
app.use("/api/roles" , routerRole)
app.use("/api/actions" , actionRouter)
// app.use("/api/batchdetails" , batchRouters )
// app.use("/api/studentdetails" , studentRouters)
// app.use("/api/batchassume" , stdinbatch)
// app.use("/api/attendencemark" , Attendence)
// app.use("/api/invoices" , Feeses)
// app.use("/api/reports" , reportses)
// starting server 
database()
app.listen(PORT,()=>{
console.log("⏱ Server..! Running..!");
spinner.start(".......") 
})







