import express from "express"
import { UserController } from "../controller/userController.js"
import { UserValidator } from "../validators/userValidator.js"
import { AuthToken } from "../middlewares/authMiddware.js"

export const UserRoutes = express.Router()

UserRoutes.get('/profile', AuthToken, UserController.getProfile)
UserRoutes.patch('/profile', AuthToken, UserValidator.update, UserController.updateProfile)
UserRoutes.patch('/profile/password', AuthToken, UserValidator.password, UserController.updadePassWord)