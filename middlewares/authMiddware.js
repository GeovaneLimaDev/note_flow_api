import { AppErro } from "../error/appError.js"
import jwt from "jsonwebtoken"

//middlewares de verificação de token
export function AuthToken(req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader){
        throw new AppErro('Token não enviado!', 401, 'NOT_AUTHORIZED')
    }

    const token = authHeader.split(' ')[1]
    
    try{
        const result = jwt.verify(token, process.env.JWT_SECRET_ACCESS)
        if(result.type !== 'access'){
           throw new Erro() 
        }
        
        req.userid = result.id
        next()
    }catch(err){
        throw new AppErro('Token inválido!', 401, 'NOT_AUTHORIZED')
    }
}