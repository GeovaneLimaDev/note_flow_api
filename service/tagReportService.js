import { AppErro } from "../error/appError.js";
import Notes from "../model/Notes.js";
import { TagsService } from "./tagsService.js";
import Documents from "../model/Documents.js";
import { where } from "sequelize";

export class Note_Tag_Service {
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

    static async addTagOfNoteOrDoc(itemId, tags, userId, type){
        if(type === 'note'){
            const note = await Notes.findOne({
                where: {UserId: userId, id: itemId}
            })

            if(!note){
                throw new AppErro('Nota não existente!', 404, 'NOT_FUND')
            }

            const tagsID = await TagsService.addTag(tags, userId)

            await note.addTag(tagsID)
        }else if(type === 'document') {
            const doc = await Documents.findOne({
                where: {UserId: userId, id: itemId}
            })

            if(!doc){
                throw new AppErro('Documento não existente!', 404, 'NOT_FUND')
            }

            const tagsId = await TagsService.addTag(tags, userId)

            await doc.addTag(tagsId)
        }
    }
}