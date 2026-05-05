import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { userService } from "../service/userService.js";

export class UserController{
    static async register(req, res){
        try{
            const user = req.body
            const result = await userService.registerUser(user)

            User.create(result) 
        }catch(error){
            return res.status(400).json({
                error: error.message
            })
        }
    }
} 