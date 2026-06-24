import { AppErro } from "../error/appError.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    static async register(data){
        //verificando se email ja existe
        const result = await User.findOne({where: {email: data.email}})
        if(result) {
            throw new AppErro('E-mail já em uso!', 400, 'EMAIL_EXISTING_SYSTEM')
        }

        //criptografando senha
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password, salt)

        //salvando no banco
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hash
        })

        //gerando token de autenticação
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})

        return {
            user: { 
                name: user.name,
                email: user.email,
                id: user.id,
            },
            token: token
        }
    }

    static async login(data) {
        //verificando se usuario existe
        const userDB = await User.findOne({where: {email: data.email}, raw: true })
        if(!userDB) {
            throw new AppErro('Usuário não encontrado', 404, 'USER_NOT_EXIST')
        }
        //verificando senha
        const match = await bcrypt.compare(data.password, userDB.password)
        if(!match) {
            throw new AppErro('Senha inválida!', 400, 'INVALID_PASSWORD');            
        }
        //criando token
        const token = await jwt.sign({id: userDB.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        return {
            user: {
                    name: userDB.name,
                    email: userDB.email,
                    id: userDB.id,
            },
            token: token
        }
    }
}