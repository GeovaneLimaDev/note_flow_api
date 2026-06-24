import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { AuthService } from "../service/authService.js";

export class AuthController{
    static async register(req, res, next){
        try{
            const data = req.body
            const user = await AuthService.
            register(data) 

            res.status(201).json({
                message: 'Usuário criado com sucesso!',
                user
            })
            
        }catch(err){
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const user = req.body
            const authentication = await AuthService.login(user)
            res.status(200).json({message: 'Usuário autenticado', authentication})
        }catch(err){
            next(err)
        }
    }
} 