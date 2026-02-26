import express from "express"
import {
    getAttSingle,
    markAttendence,
    updateAttendance,
    getbybatch


} from "../controllers/attent_logic.js"

import authent from "../../authentications-1/middlewares/authmiddle.js"
import rolles from "../../authentications-1/middlewares/userRoles.js"

const router = express.Router()

router.get("/attendance/student/:studentId" ,authent,rolles("admin" , 'staff' , "director" , "student" ,) ,getAttSingle)
router.get("/attendance/batch/:batchId" ,authent, rolles("admin" , "director" , "staff"), getbybatch)
router.post("/attendance/mark" ,authent, rolles("admin" , "staff"), markAttendence)
router.put("/attendance/:attendanceId/student/:studentId" ,authent, rolles("admin","staff"), updateAttendance)

export default router

