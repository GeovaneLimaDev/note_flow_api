import { AppErro } from "../error/appError.js";
import Notes from "../model/Notes.js";
import { TagsService } from "./tagsService.js";
import Documents from "../model/Documents.js";
import { where } from "sequelize";
import Tags from "../model/Tags.js";

export class Note_Tag_Service {
    //removendo tags de um documento ou nota
    static async removeTagOfNoteOrDoc(itemId, tagId, userId, type){
        if(type === 'note'){
            const note = await Notes.findOne({
                where: {UserId: userId, id: itemId}
            })
            
            if(!note){
                throw new AppErro('Nota não existente!', 404, 'NOT_FUND')
            }
            
            await note.removeTag(tagId)
        }else if(type === 'document'){
            const doc = await Documents.findOne({
                where: {UserId: userId, id: itemId}
            })
            
            if(!doc){
                throw new AppErro('Documento não existente!', 404, 'NOT_FUND')
            }
            
            await doc.removeTag(tagId)
        } 
    }
    //adicionando tags de um documento ou nota
    static async addTagOfNoteOrDoc(itemId, tags, userId, type){
        if(type === 'note'){
            const noteDB = await Notes.findOne({
                where: {UserId: userId, id: itemId},
                include: Tags
            })
            
            if(!noteDB){
                throw new AppErro('Nota não existente!', 404, 'NOT_FUND')
            }

            if(noteDB.Tags.length >= 5){
                throw new AppErro('Máximo de 5 tags atingida!', 400, 'MAXIMUM_TAGS_REACHED')
            }

            const tagsID = await TagsService.addTag(tags, userId)

            await noteDB.addTag(tagsID)
        }else if(type === 'document') {
            //validando existencia no banco
            const docDB = await Documents.findOne({
                where: {UserId: userId, id: itemId},
                include: Tags
            })

            if(!docDB){
                throw new AppErro('Documento não existente!', 404, 'NOT_FUND')
            }
            //validando máximo de tags por documento ou nota
            if(docDB.Tags.length >= 5){
                throw new AppErro('Máximo de 5 tags atingida!', 400, 'MAXIMUM_TAGS_REACHED')
            }

            const tagsAll = docDB.Tags.length + tags.length  
            if(tagsAll > 5){
                throw new AppErro('Um documento ou nota só pode ter 5 tags!', 400, 'MAXIMUM_TAGS_REACHED')
            }

            const tagsId = await TagsService.addTag(tags, userId)

            await docDB.addTag(tagsId)
        }
    }
}