import { AppErro } from "../error/appError.js";
import Notes from "../model/Notes.js";
import { TagsService } from "./tagsService.js";

export class Note_Tag_Service {
    static async removeTagOfNote(noteId, tagId, userId) {
        const note = await Notes.findOne({
            where: {UserId: userId, id: noteId}
        })
        
        if(!note){
            throw new AppErro('Nota não existente!', 404, 'NOT_FUND')
        }
        
        await note.removeTag(tagId)
    }

    static async addTagOfNote(noteId, tags, userId){
        const note = await Notes.findOne({
            where: {UserId: userId, id: noteId}
        })

        if(!note){
            throw new AppErro('Nota não existente!', 404, 'NOT_FUND')
        }

        const tagsID = await TagsService.addTag(tags, userId)

        await note.addTag(tagsID)
    }
}