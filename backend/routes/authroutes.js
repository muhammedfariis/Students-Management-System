import express from "express"
import auths from "../middlewares/authmiddle.js"
import {
  register,
  login,
  getauth
} from "../authentications-1/controllers/auth.js"


const router = express.Router()

router.get("/me" ,auths, getauth)
router.post("/register", register)
router.post("/login", login)

export default router




