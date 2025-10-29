import express from "express"
import {
    batchCreat,
    getBatches,
    getBatchId

} from "../controllers/batches.js"

import auth from "../../authentications/middlewares/authmiddle.js"
import allowRoles from "../../authentications/middlewares/userRoles.js"
 
const router = express.Router()
router.get("/batches" ,auth,  getBatches)
router.get("/batches/:id",auth , getBatchId)
router.post("/batches" ,auth, allowRoles("admin" , "director") , batchCreat)

export default router