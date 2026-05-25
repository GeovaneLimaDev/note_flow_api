import { AppErro } from "../error/appError.js";
import { removeCopyArray } from "../ultils/removeCopyArray.js"; 
import Tags from "../model/Tags.js";
import { TagsValidator } from "../validators/tagsValidator.js";

export class TagsService {

    //adicionando tag com nota
    static async addTag(tags, userId) {
        //padroniza e valida as tags
        const tagsStandardized = TagsValidator.tagsValidatorArrays(tags)

        // remove as duplicatas no array origina
        const arrayNotCopy = removeCopyArray(tagsStandardized)
        //adiciona no banco e pega os ids
        const tagsID = []
        for (const tag of arrayNotCopy) {
            // verificando banco de dados
            const tagDB = await Tags.findOne({
                where: {UserId: userId, name: tag}
            })

            if(tagDB){
                tagsID.push(tagDB.id) // salva ids das tags para salvar no banco de relação
            }else{
                //adiciona no banco 
                const newTag = {
                    name: tag,
                    UserId: userId
                }

                const tagCreated = await Tags.create(newTag)  // cria tag no banco de dados
                tagsID.push(tagCreated.id)
            }
        }

        return tagsID
    }

    // adicionando tag ao banco sem fazer relação com nota
    static async() {
        
    }
}