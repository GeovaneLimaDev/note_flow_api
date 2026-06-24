import { AppErro } from "../error/appError.js"

export class UserValidator {
    static update(req, res, next) {
        const body = req.body
        //validando body  
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        if(keys.length === 0) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        } 

        //body.email válido?
        const emailModel = /^\S+@\S+\.\S+$/
        if(!emailModel.test(body.email) && body.email) {
            throw new AppErro('E-mail inválido', 400, 'EMAIL_INVALID')
        }
        
        //validando tamanho mínimo do userName
        if(body.name.length >= 1 && body.name.length < 3) {
            throw new AppErro('Nome de usuário curto de mais', 400, 'VERY_SHORT_NAME')
        }

        //validando tamanho máximo do username 
        if(body.name.length > 35){
            throw new AppErro('Nome de usuário longo de mais', 400, 'VERY_BIG_NAME')
        }
        next()
    }

    static password(req, res, next) {
        const newPassword = req.body.newPassword
        const currentPassword = req.body.currentPassword
        // validando senhas
        if(!currentPassword || !newPassword) {
            throw new AppErro('Senhas não enviadas!', 400, 'EMPTY_BODY')
        }

        //senha forte?
        if(newPassword.length < 6) {
            throw new AppErro('Senha deve ter mínimo de 6 caracteres', 400, 'WEAK_PASSWORD')
        }

        next()
    }
}