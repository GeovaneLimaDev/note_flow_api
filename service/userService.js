import { AppErro } from "../error/appError.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

export class UserService{
    static async getProfile(userId){
        const profileDB = await User.findOne({where: {id: userId}})

        return {
            name: profileDB.name,
            id: profileDB.id,
            email: profileDB.email
        }
    }

    static async updateProfile(userId, newEmail, newName) {
        const userDB = await User.findOne({where: {id: userId}})
        if(!userDB){
            throw new AppErro('Usuário não existente!', 404, 'NOT_FUND')
        }
        if(userDB.email === newEmail){
            throw new AppErro('O novo email deve ser diferente do email atual', 400, 'SAME_EMAIL_CURRENT')
        }

        const validEmail = await User.findOne({where: {email: newEmail}})
        if(validEmail){
            throw new AppErro('E-mail já esta em uso!', 400, 'EMAIL_EXISTING_SYSTEM')
        } 

        const newProfile = {
            name: newName ? newName : userDB.name, 
            email: newEmail ? newEmail : userDB.email
        }

        await User.update(newProfile, {where: {id: userId}})
        return {
            message: "Perfil atualizado!"
        }
    }

    static async updatePassWord(userId, newPassword, currentPassword) {
        const userDB = await User.findOne({where: {id: userId}})

        const match = await bcrypt.compare(currentPassword, userDB.password)
        if(!match) {
            throw new AppErro('Senha inválida!', 400, 'INVALID_PASSWORD');
        }

        //as senhas são iguais?
        if(newPassword === currentPassword) {
            throw new AppErro('A nova senha deve ser diferente da atual', 400, 'DIFFERENT_PASSWORD')
        }
        
        //cripitografar senha        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        //atualizando senha
        await User.update({password: hash}, {where: {id: userId}})
        return {
            message: 'Senha atualizada!'
        }
    }

    static async  deleteProfile(userId, password) {
        const userDB = await User.findOne({where: {id: userId}})
        if(!userDB){
            throw new AppErro('Usuário não existente!', 404, 'NOT_FUND')
        }

        const match = await bcrypt.compare(password, userDB.password)
        if(!match) {
            throw new AppErro('Senha inválida!', 400, 'INVALID_PASSWORD');
        }

        await User.destroy({where: {id: userId}})
        return {
            message: 'Conta excluida com sucesso!'
        }
    }
}