import { AppErro } from "../error/appError.js"
import User from "../model/User.js"


export class userValidator{
    //validação da área de registro 
    static registerPassword(pass, passConfirm){
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
        //email válido?
        const emailModel = /^\S+@\S+\.\S+$/
        if(!emailModel.test(email)) {
            throw new AppErro('Email inválido', 400, 'EMAIL_INVALID')
        }
        
        //email já existente no sistema?
        const emailExist = await User.findOne({where: {email: email}})
        console.log(emailExist)
        if(emailExist) {
            throw new AppErro('Email já existente', 400, 'EMAIL_EXISTING_SYSTEM')
        }
    }

}