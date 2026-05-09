import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { userService } from "../service/userService.js";

export class UserController{
    static async register(req, res, next){
        try{
            const data = req.body
            const user = await userService.registerUser(data) 

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
            const token = await userService.loginUser(user)
            res.status(200).json({message: 'Usuário autenticado', token})
        }catch(err){
            next(err)
        }
    }
} 