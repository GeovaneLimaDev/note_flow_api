import { AppErro } from "../error/appError.js"
import User from "../model/User.js"

export class userValidator{
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
}