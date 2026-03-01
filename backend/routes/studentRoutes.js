import express from "express"
import {
  creatStudent,
  getAllStudents,
  getByID
} from "../students-management-4/controllers/student.js"
import auth from "../../authentications-1/middlewares/authmiddle.js"
import roles from "../../authentications-1/middlewares/userRoles.js"

const router = express.Router()

router.get("/students" ,auth, roles("admin" , "director" , "sales" , "staff") , getAllStudents)
router.get("/students/:id" ,auth, roles("admin" , "director" , "sales" , "staff" , "student"), getByID)
router.post("/students" , auth, roles("admin" , "sales") , creatStudent)

export default router