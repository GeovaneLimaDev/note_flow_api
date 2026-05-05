import User from "../model/User.js";

export class userService {
    static async registerUser(user){

        //verificando se o email já esta sendo usado
        const email = await User.findOne({where: {email: user.email}})
        if(email){
            throw new Error('Usúario já existente!')
        }

        //verificando se as senhas batem
        if(user.password !== user.passwordConfirm) {
            throw new Error('Senhas não correspondem!') 
        }    
        
        //verificando o mínimo de cracteres da senha 
        if(user.password.length < 6){
            throw new Error('Senha deve ter no mínimo 6 caracteres!')
        }
    }
}