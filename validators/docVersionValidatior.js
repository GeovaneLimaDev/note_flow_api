import { AppErro } from "../error/appError.js"
import { isNumber } from "../ultils/isNumber.js"
import { isString } from "../ultils/isString.js"

export class DocumentVersionValidator {
    static addVersion(req, res, next) {
        const body = req.body
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        const fieldVilid = keys.find((item) => item === 'documentId' || item === 'titleVersion')  
        if(keys.length === 0 || !fieldVilid) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        //validando titleVersion
        if(!body.titleVersion || !isString(body.titleVersion)){
            throw new AppErro('Dados necessários não enviados e o titulo da versão não pode ser vazio!', 400, 'EMPTY_BODY')
        }
        if(body.titleVersion.length < 3){
            throw new AppErro('Titulo da versão muito curto!', 400, 'VERY_SHORT_TITLE');
        }

        if(body.titleVersion.length > 255) {
            throw new AppErro('Título da versão atingiu o máximo de caracteres!', 400, 'VERY_BIG_TITLE');
        }

        //validando documentId 
        if(!body.documentId || !isNumber(body.documentId)){
            throw new AppErro('O documentId deve ser um número válido e não pode ser nulo!', 400, 'INVALID_VALUE');
        }
        next()
    }
}