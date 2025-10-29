import express from 'express'
import {
  creatUsers,
  getUsers,
  getUsersById,
  updateUsers,
  remove
} from '../controllers/userLogics.js'

import auth from "../../authentications/middlewares/authmiddle.js"
import roles from "../../authentications/middlewares/userRoles.js"

const routers = express.Router()

routers.get("/users" , auth ,roles("admin" , "director"), getUsers)

routers.get("/users/:id" ,auth , roles("admin") , getUsersById)

routers.post("/users" , creatUsers)

routers.put("/users/:id" ,auth ,roles("admin"), updateUsers)

routers.delete("/users/:id",auth ,roles("admin") , remove)

export default routers