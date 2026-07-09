import express from "express"
import { AuthController } from "../controller/authController.js"
import { AuthValidator } from "../validators/authValidator.js" 
export const AuthRoutes = express.Router()

AuthRoutes.post('/register', AuthValidator.register, AuthController.register)
AuthRoutes.post('/login', AuthValidator.login, AuthController.login)
AuthRoutes.post('/forgot-password', AuthValidator.forgotPassword, AuthController.forgotPassword) 
AuthRoutes.post('/recover-password', AuthValidator.recoverPassword, AuthController.recoverPassword) 
AuthRoutes.get('/refresh', AuthValidator.refresh, AuthController.refresh) 