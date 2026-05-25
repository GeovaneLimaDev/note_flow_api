import { AppErro } from "../error/appError.js";

export class TagsValidator {
    static tagsValid(tag) {
        if(tag.length < 3){
            throw new AppErro('Tag precisa ter mais de 3 caracteres', 400, 'VERY_SHORT_TAG')
        } 

        if(tag.length > 15){
            throw new AppErro('Tag deve ter no máximo 15 caracteres', 400, 'VERY_BIG_TAG')          
        }
    }
}