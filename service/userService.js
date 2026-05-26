import { AppErro } from "../error/appError.js";
import User from "../model/User.js";
import { userValidator } from "../validators/userValidator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class userService {
    static async registerUser(data){
        await userValidator.registerName(data.name)
        await userValidator.registerEmail(data.email)
        await userValidator.registerPassword(data.password, data.passwordConfirm)

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

    static async loginUser(data) {
        //verificando se usuario existe
        const userDB = await User.findOne({where: {email: data.email}, raw: true })
        if(!userDB) {
            throw new AppErro('Usuário não encontrado', 404, 'USER_NOT_EXIST')
        }
        //verificando senha
        const match = await bcrypt.compare(data.password, userDB.password)
        if(!match) {
            throw new AppErro('Senha incorreta!', 400, 'INVALID_PASSWORD');            
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