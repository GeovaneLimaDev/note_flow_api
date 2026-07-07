import { AppErro } from "../error/appError.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import TokenRecoveryPassword from "../model/TokenRecoveryPassword.js";
import transport from "../config/mail.js";
import fs from "fs/promises"
import path from "path";
import replacePlaceholders from "../ultils/replacingPlaceholders.js";
import { conn } from "../db/connection.js";

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

    static async forgotPassword(email, next) {
        //recebendo email e validando usuário
        const userDB = await User.findOne({where: {email: email}})
        if(!userDB) {
            throw new AppErro('Nenhum usuário cadastrado com esse email', 404, 'NOT_FOUND')
        }
        //gerando token
        const token = crypto.randomBytes(32).toString('hex')

        //salvando token
        const hash = crypto.createHash("sha256").update(token).digest("hex")

        const date = new Date(new Date().getTime() + 30 * 60000)

        const recoveryUser = {
            token: hash,
            UserId: userDB.id,
            expiresAt: date
        }
        await TokenRecoveryPassword.create(recoveryUser)

        //enviaando email
        const tampleteEmail = await fs.readFile(`${path.resolve('templates','recovyPassword.html')}`, 'utf-8')
        
        const objReplace = {
            name: 'Geovane',
            link: `http://localhost:3000/search?token=${token}`
        }
        const emailFinished = replacePlaceholders(objReplace, tampleteEmail)
        
        transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Recuperação de Senha.',
            html: emailFinished
        }).then(() => {
            console.log('Email enviado!')
        }).catch((err) => {
            console.log(err)
        })
        //enviando mensagem 
        return {
            message: "Acesse o link que enviamos para o seu email"
        }
    }

    static async recoverPassword (token, password) {
        //validar token 
        const hashToken = crypto.createHash("sha256").update(token).digest("hex")
        const tokenDB = await TokenRecoveryPassword.findOne({where: {token: hashToken}})

        if(!tokenDB) {
            throw new AppErro('Token inválido!', 400, 'NOT_AUTHORIZED')
        }

        if(tokenDB.expiresAt < new Date()) {
            throw new AppErro('Token expirou!', 400, 'NOT_AUTHORIZED')
        }
    
        const transaction = await conn.transaction()
        try {
            //cripitografar senha 
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(password, salt)

            //salvar senha
            await User.update({password: hashPass}, {where: {id: tokenDB.UserId}, transaction})

            // deletar token 
            await TokenRecoveryPassword.destroy({where: {UserId: tokenDB.UserId}, transaction})

            //enviando messagem
            await transaction.commit()
            return {
                message: "Nova senha salva"
            }
        } catch (err) {

            await transaction.rollback()
            throw new AppErro('Algo deu errado, não conseguimos salvar sua senha! Tente novamente mais tarde!', 500, 'INTERNAL_PROBLEM')
        }
    }
}