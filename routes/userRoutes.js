import express from "express"
import { UserController } from "../controller/userController.js"
export const UserRoutes = express.Router()

UserRoutes.post('/register', UserController.register)