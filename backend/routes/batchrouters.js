import express from "express"
import {
    batchCreat,
    getBatches,
    getBatchId

} from "../controllers/batches.js"

import auth from "../../authentications-1/middlewares/authmiddle.js"
import allowRoles from "../../authentications-1/middlewares/userRoles.js"
 
const router = express.Router()
router.get("/batches" ,auth,  getBatches)
router.get("/batches/:id",auth , getBatchId)
router.post("/batches" ,auth, allowRoles("admin" , "director") , batchCreat)

export default router