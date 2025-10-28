import express from 'express'
import {
  creatUsers,
  getUsers,
  getUsersById,
  updateUsers,
  remove
} from '../controllers/userLogics.js'

import auth from "../middlewares/usermiddle.js"
import roles from "../middlewares/roles.js"

const routers = express.Router()

routers.get("/users" , auth ,roles("admin" , "directors"), getUsers)

routers.get("/users/:id" ,auth , roles("admin") , getUsersById)

routers.post("/users" , creatUsers)

routers.put("/users/:id" ,auth ,roles("admin"), updateUsers)

routers.delete("/users/:id",auth ,roles("admin") , remove)

export default routers