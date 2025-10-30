import express from "express"
import {
  creatStudent,
  getAllStudents,
  getByID
} from "../controllers/student.js"
import auth from "../../authentications/middlewares/authmiddle.js"
import roles from "../../authentications/middlewares/userRoles.js"

const router = express.Router()

router.get("/students" ,auth, roles("admin" , "director" , "sales" , "staff") , getAllStudents)
router.get("/students/:id" ,auth, roles("admin" , "director" , "sales" , "staff" , "student"), getByID)
router.post("/students" , auth, roles("admin" , "sales") , creatStudent)

export default router