import { AppErro } from "../error/appError.js";
import { removeCopyArray } from "../ultils/removeCopyArray.js"; 
import Tags from "../model/Tags.js";
import { TagsValidator } from "../validators/tagsValidator.js";

export class TagsService {

    //adicionando tag com nota/documento
    static async addTag(tags, userId) {
        //padroniza as tags
        const arrayValid = tags.map(item => {
            const tagStandard = item.trim().toLowerCase()
            return tagStandard
        })
        // remove as duplicatas no array origina
        const arrayNotCopy = removeCopyArray(arrayValid)
        //adiciona no banco e pega os ids
        const tagsID = []
        for (const tag of arrayNotCopy) {
            // valida as tags
            await TagsValidator.tagsValid(tag)
            // verificando banco de dados
            const tagDB = await Tags.findOne({
                where: {UserId: userId, name: tag}
            })

            if(tagDB){
                tagsID.push(tagDB.id) // salva ids das tags para salvar no banco de relação
            }else{
                // adiciona no banco 
                const newTag = {
                    name: tag.trim().toLowerCase(),
                    UserId: userId
                }

                const tagCreated = await Tags.create(newTag)  // cria tag no banco de dados
                tagsID.push(tagCreated.id)
            }
        }

        return tagsID
    }

    // adicionando tag ao banco sem fazer relação com nota ou documento 
    static async createTag(tag, userId) {
        //valida a tag
        await TagsValidator.tagsValid(tag, userId)
        //verifica existencia no banco
        const tagDB = await Tags.findOne({
            where: {UserId: userId, name: tag},
        })
        if(tagDB){
            throw new AppErro('Tag já existente"', 400, 'TAG_EXISTING_SYSTEM')
        }
        //padroniza
        const newTag = tag.trim().toLowerCase()

        const result = await Tags.create({name: newTag, UserId: userId})
        return result
    }

    //deletando tags
    static async deleteTag(tagId, userId) {
        //verificando se tag existe
        const tagDB = await Tags.findOne({
            where: {UserId: userId, id: tagId}
        })

        if(!tagDB) {
            throw new AppErro('Teg não encontrada!', 404, 'NOT_FUND');
        }

        await Tags.destroy({where: {id: tagDB.id}})
    }

    //buscando tags 
    static async getTagsAll(userid){
        const tags = await Tags.findAll({
            where: {UserId: userid},
        })

        if(tags.length === 0){
        return {message: 'O usuário não tem nenhuma tag ate o momento'}
        }

        return tags
    }
}