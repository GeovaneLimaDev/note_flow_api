import { AppErro } from "../error/appError.js"
import User from "../model/User.js"
import jwt from "jsonwebtoken"

export class AuthValidator{
    //validação da área de registro 
    static register(req, res, next){
        const body = req.body 
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        if(keys.length === 0) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        // validando senhas
        if(!body.password || !body.passwordConfirm) {
            throw new AppErro('Senhas não enviadas!', 400, 'EMPTY_BODY')
        }

        //senha forte?
        if(body.password.length < 6) {
            throw new AppErro('Senha deve ter mínimo de 6 caracteres', 400, 'WEAK_PASSWORD')
        }

        //senhas batem?
        if(body.password !== body.passwordConfirm) {
            throw new AppErro('Senhas não correspondem', 400, 'DIFFERENT_PASSWORD')
        }

        //validando email 
        if(!body.email){
            throw new AppErro('E-mail não enviado!', 400, 'EMPTY_BODY')
        }

        //body.email válido?
        const emailModel = /^\S+@\S+\.\S+$/
        if(!emailModel.test(body.email)) {
            throw new AppErro('E-mail inválido', 400, 'EMAIL_INVALID')
        }

        //o Nome  foi enviado?
        if(!body.name){
            throw new AppErro('Nome de usuário não enviado!', 400, 'DATA_NOT_SEND')
        }
        //validando tamanho mínimo do userName
        if(body.name.length < 3) {
            throw new AppErro('Nome de usuário curto de mais', 400, 'VERY_SHORT_NAME')
        }

        //validando tamanho máximo do username 
        if(body.name.length > 35){
            throw new AppErro('Nome de usuário longo de mais', 400, 'VERY_BIG_NAME')
        }
        next()
    }

    static login (req, res, next) {
        const body = req.body 
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        if(keys.length === 0) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
         //validando email 
        if(!body.email){
            throw new AppErro('E-mail não enviado!', 400, 'EMPTY_BODY')
        }

        //body.email válido?
        const emailModel = /^\S+@\S+\.\S+$/
        if(!emailModel.test(body.email)) {
            throw new AppErro('E-mail inválido', 400, 'EMAIL_INVALID')
        }

        // validando senhas
        if(!body.password) {
            throw new AppErro('Senhas não enviadas!', 400, 'EMPTY_BODY')
        }

        //senha forte?
        if(body.password.length < 6) {
            throw new AppErro('Senha deve ter mínimo de 6 caracteres', 400, 'WEAK_PASSWORD')
        }
        next()
    }

    static async refresh(req, res, next) {
        const authHeader = req.headers.authorization

        if(!authHeader){
            throw new AppErro('Token não enviado!', 400, 'NOT_TOKEN')
        }

        const token = authHeader.split(' ')[1]

        req.token = token
        next()
    }

    static forgotPassword(req, res, next){
        const {email} = req.body
        //validando email 
        if(!email){
            throw new AppErro('E-mail não enviado!', 400, 'EMPTY_BODY')
        }

        //email válido?
        const emailModel = /^\S+@\S+\.\S+$/
        if(!emailModel.test(email)) {
            throw new AppErro('E-mail inválido', 400, 'EMAIL_INVALID')
        }
        next()
    }
    
    static recoverPassword(req, res, next) {
        const body = req.body
        if(!body) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        //validando senha          
        if(!body.password) {
            throw new AppErro('Senha não enviada!', 400, 'EMPTY_BODY')
        }

        //senha forte?
        if(body.password.length < 6) {
            throw new AppErro('Senha deve ter mínimo de 6 caracteres', 400, 'WEAK_PASSWORD')
        }

        //validando token
        if(!body.token){
            throw new AppErro('Token não enviado!', 400, 'EMPTY_BODY')
        }
        next()
    }
}