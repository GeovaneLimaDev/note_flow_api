import { AppErro } from "../error/appError.js"
import { isString } from "../ultils/isString.js"

export class FoldersValidator {
    static titleFolders(req, res, next){
        //validando body 
        const body = req.body
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        if(keys.length === 0) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        //validando title
        if(!body.title || !isString(body.title)){
            throw new AppErro('Titulo deve ser em formato de texto e não pode ser vazio!', 400, 'TITLE_UNDEFINED');
        }

        if(body.title.length < 3){
            throw new AppErro('Titulo muito curto!', 400, 'VERY_SHORT_TITLE');
        }

        if(body.title.length > 255) {
            throw new AppErro('Título atingiu o máximo de caracteres!', 400, 'VERY_BIG_TITLE');
        }
        
        next()
    }
}