import { where } from "sequelize";
import { AppErro } from "../error/appError.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import { NoteValidator } from "../validators/noteValidator.js";
import { TagsService } from "./tagsService.js";


export class NotesService {
    //criando nota
    static async createNotes(userId, note) {
        const title = NoteValidator.title(note.title) //validando titulo
        const tagsId = await TagsService.addTag(note.tags, userId)// validando tags
        const newNote = {
            title: title,
            content: note.content,
            UserId: userId
        }
        
        const newCreate = await Notes.create(newNote) //salvar no banco
        
        await newCreate.addTags(tagsId) // faz as relações das notas com as tags 
    }

    // buscando todas as notas 
    static async getNotesAll(userId) {
        const NotesAll = await Notes.findAll({
            where: {UserId: userId},
            include: Tags
        })

        return NotesAll
    }

    //buscando mais de uma nota
    static async getNote() {

    }

    //editando nota
    static async updateNotes(userId, noteId, noteData){
        //validando existencia do body
        const keys = Object.keys(noteData)
        const fieldVilid = keys.find((item) => item === 'title' || item === 'content') 
        if(keys.length === 0 || !fieldVilid){
            throw new AppErro('Dados necessarios não enviados!', 400, 'EMPTY_BODY')
        }

        const noteDB = await Notes.findOne({
            where: {UserId: userId, id: noteId}
        }) 
        //verificando existencia da nota no banco 
        if(!noteDB) {
            throw new AppErro('Nota não existente!', 404, 'NOT_FOUND')
        }
        // validando dados

        const updateData = {
            title: noteData.title ? await NoteValidator.title(noteData.title) : noteDB.title,
            content: noteData.content ? noteData.content.trim() : ""
        }

        await Notes.update(updateData, {where: {id: noteId}})
        const newNote = {
            title: updateData.title,
            content: updateData.content,
            id: noteId,
            userId: userId
        }
        return newNote
    }
}
