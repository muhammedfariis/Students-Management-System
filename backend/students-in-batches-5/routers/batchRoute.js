import express from "express"
import {
    assigningTheBatch,
    getstudentsinbatch,
    deletestudentid
    
} from "../controllers/batch.js"
import authentic from "../../authentications-1/middlewares/authmiddle.js"
import roleses  from "../../authentications-1/middlewares/userRoles.js"
const router = express.Router()

router.get("/batches/:batchId/students" , authentic , roleses("admin" , "director" , "staff" ),getstudentsinbatch)
router.post("/batches/:batchId/students" , authentic , roleses("admin" , "staff"),assigningTheBatch)
router.delete("/batches/:batchId/students/:studentId" , authentic ,roleses("admin" , "staff "),deletestudentid)

export default router