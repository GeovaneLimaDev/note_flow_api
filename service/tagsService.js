import { AppErro } from "../error/appError.js";
import { removeCopyArray } from "../ultils/removeCopyArray.js"; 
import Tags from "../model/Tags.js";
import { where } from "sequelize";
import { NoteTagsService } from "./noteTagsService.js";

export class TagsService {

    static async addTag(tags, noteId, userId) {
        //padroniza as tags
        const tagsLowerCase = tags.map(item => {
            const tagTrim = item.trim()
            const tagLower = tagTrim.toLowerCase()
            if(tagLower.length < 3){
                throw new AppErro('Tag muito curta', 400, 'VERY_SHORT_TAG')
            }

            return tagLower
        })

        const arrayNotCopy = removeCopyArray(tagsLowerCase) // remove as duplicatas no array origina
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
}