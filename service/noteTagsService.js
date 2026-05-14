import NotesTags from "../model/NotesTags.js"

export class NoteTagsService {
    static async addNoteTag(noteId, tagsId, userId){
        for (const item of tagsId) {
            const newReport = {
                noteId: noteId,
                tagId: item
            }

            await NotesTags.create(newReport)
        }//salvar no banco
    }
}