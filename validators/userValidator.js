import { AppErro } from "../error/appError.js"
import User from "../model/User.js"


export class userValidator{
    //validação da área de registro 
    static registerPassword(pass, passConfirm){
        //as senhas foram enviadas 
        if(!pass || !passConfirm) {
            throw new AppErro('Senhas não enviadas!', 400, 'EMPTY_BODY')
        }

        //senha forte?
        if(pass.length < 6) {
            throw new AppErro('Mínimo de 6 caracteres', 400, 'WEAK_PASSWORD')
        }

        //senhas batem?
        if(pass !== passConfirm) {
            throw new AppErro('Senhas não correspondem', 400, 'DIFFERENT_PASSWORD')
        }
    }

    static async registerEmail(email) {
        //o emeil foi enviado
        if(!email){
            throw new AppErro('E-mail não enviado!', 400, 'EMPTY_BODY')
        }

        //email válido?
        const emailModel = /^\S+@\S+\.\S+$/
        if(!emailModel.test(email)) {
            throw new AppErro('E-mail inválido', 400, 'EMAIL_INVALID')
        }
        
        //email já existente no sistema?
        const emailExist = await User.findOne({where: {email: email}, raw: true})
        if(emailExist) {
            throw new AppErro('E-mail já existente', 400, 'EMAIL_EXISTING_SYSTEM')
        }
    }

    static registerName(name) {
        //o Nome  foi enviado?
        if(!name){
            throw new AppErro('Nome de usuário não enviado!', 400, 'DATA_NOT_SEND')
        }
        //validando tamanho mínimo do userName
        if(name.length < 3) {
            throw new AppErro('Nome de usuário curto de mais', 400, 'VERY_SHORT_NAME')
        }

        //validando tamanho máximo do username 
        if(name.length > 35){
            throw new AppErro('Nome de usuário longo de mais', 400, 'VERY_BIG_NAME')
        }
    }

}