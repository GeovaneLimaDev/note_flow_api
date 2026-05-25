import { AppErro } from "../error/appError.js";
import Tags from "../model/Tags.js";

export class TagsValidator {
    // validar os arrays de tags 
    static tagsValidatorArrays(array) {
        const arrayValid = array.map(item => {
            const tagTrim = item.trim()
            const tagLower = tagTrim.toLowerCase()
            if(tagLower.length < 3){
                throw new AppErro('Tag muito curta', 400, 'VERY_SHORT_TAG')
            }

            if(tagLower.length > 15){
                throw new AppErro('Tag muito longa', 400, 'VERY_BIG_TAG')
            }
            
            return tagLower
        })
        return arrayValid
    }
}