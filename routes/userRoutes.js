import express from "express"
import { UserController } from "../controller/userController.js"
import { userValidator } from "../validators/userValidator.js"
export const UserRoutes = express.Router()

UserRoutes.post('/register', userValidator.register, UserController.register)
UserRoutes.post('/login',userValidator.login, UserController.login)