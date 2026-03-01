import express from "express"
import{
 creatFees,
 creatPayment,
 feeOwnStudent
} from "../controllers/fee_control.js"

import rol from "../../authentications-1/middlewares/userRoles.js"
import aut from "../../authentications-1/middlewares/authmiddle.js"

const router = express.Router()

router.get("/fees/student/:studentId",aut,rol("admin" , "director" , "sales" , "student") , feeOwnStudent)
router.post("/fees" ,aut,rol("admin" , "sales") , creatFees)
router.post("/fees/payment" ,aut , rol("admin" , "sales"), creatPayment)

export default router