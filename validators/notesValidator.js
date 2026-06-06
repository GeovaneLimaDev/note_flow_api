import { AppErro } from "../error/appError.js";
import { isString } from "../ultils/isString.js";

//middlewares de validação de body das rotas de notas 
export class NotesValidator {
    static createNote(req, res, next) {
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
        //validando tags
        if(body.tags){
            if(!Array.isArray(body.tags)){
                throw new AppErro('Tags devem ser enviadas em um array!', 400, 'INVALID_FORMATTING');
            }

            if(body.tags.length > 5) {
                throw new AppErro('Número máximo de tags atingido!', 400, 'MAXAIMUM_NUMBER')
            }
        }
        next()
    }

    static updateNote(req, res, next) {
        //validando body
        const body = req.body
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        const fieldVilid = keys.find((item) => item === 'title' || item === 'content') 
        if(keys.length === 0 || !fieldVilid) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        //validando title
        if(!isString(body.title)){
            throw new AppErro('Titulo deve ser em formato de texto!', 400, 'TITLE_UNDEFINED');
        }

        if(body.title.length >= 1 && body.title.length < 3){
            throw new AppErro('Titulo muito curto!', 400, 'VERY_SHORT_TITLE');
        }

        if(body.title.length > 255) {
            throw new AppErro('Título atingiu o máximo de caracteres!', 400, 'VERY_BIG_TITLE');
        }
        next()
    }

    static archiveNote(req, res, next) {
        const body = req.body
        if(!body){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(body)
        const fieldVilid = keys.find((item) => item === 'archive') 
        if(!body || !fieldVilid){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        if(body.archive !== false && body.archive !== true) {
            throw new AppErro('O campo archive deve ser enviado em formato de boolean!', 400, 'EMPTY_BODY')
        }
        next()
    }
}