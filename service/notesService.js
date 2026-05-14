import Notes from "../model/Notes.js";
import { NoteValidator } from "../validators/noteValidator.js";
import { NoteTagsService } from "./noteTagsService.js";
import { TagsService } from "./tagsService.js";

export class NotesService {
    static async createNotes(userId, note) {
        NoteValidator.titlevalidator(note.title) //validando titulo
        const tagsId = await TagsService.addTag(note.tags, note.id, userId)// validando tags
        const newNote = {
            title: note.title,
            content: note.content,
            UserId: userId
        }
        
        const newCreate = await Notes.create(newNote) //salvar no banco
        
        const result = await NoteTagsService.addNoteTag(newCreate.id, tagsId, userId)
    }
}