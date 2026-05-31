import { where } from "sequelize";
import { AppErro } from "../error/appError.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import { NoteDocValidator } from "../validators/noteDocValidator.js";
import { TagsService } from "./tagsService.js";


export class NotesService {
    //criando nota
    static async createNotes(userId, note) {
        //validando titulo
        const title = NoteDocValidator.title(note.title) 
        // validando tags
        const tagsId = await TagsService.addTag(note.tags, userId)
        const newNote = {
            title: title,
            content: note.content,
            UserId: userId,
            deleteAt: null,
            type: 'note'
        }
        
        const newCreate = await Notes.create(newNote) //salvar no banco
        
        await newCreate.addTags(tagsId) // faz as relações das notas com as tags 
    }

    // buscando todas as notas 
    static async getNotesAll(userId) {
        const NotesAll = await Notes.findAll({
            where: {UserId: userId, deleteAt: null},
            include: Tags,
        })

        if(NotesAll.length === 0) {
            return {
                message: 'O usuário não tem notas adicionadas até o momento!'}
        } 

        return NotesAll
    }

    //buscando uma nota
    static async getNote(userId, noteId) {
        const note = await Notes.findOne({
            where: {UserId: userId, id: noteId, deleteAt: null},
            include: Tags,
        })
        //verificando existencia da nota
        if(!note) {
            throw new AppErro('Nota não existente!', 404, 'NOT_FUND');
        }

        return note
    }

    //editando nota
    static async updateNotes(userId, noteId, noteData){
        //validando existencia do body e se tem ao menos um campo que atualizavel
        if(!noteData) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(noteData)
        const fieldVilid = keys.find((item) => item === 'title' || item === 'content') 
        if(keys.length === 0 || !fieldVilid){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }

        //verificando existencia da nota no banco 
        const noteDB = await Notes.findOne({
            where: {UserId: userId, id: noteId, deleteAt: null},
        }) 
        if(!noteDB) {
            throw new AppErro('Nota não existente!', 404, 'NOT_FOUND')
        }

        // validando dados
        const updateData = {
            title: noteData.title ? await NoteDocValidator.title(noteData.title) : noteDB.title,
            content: noteData.content ? noteData.content.trim() : noteDB.content
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

    //deletando nota
    static async deleteNotes(userId, noteId) {
        //essa query ja checa se a nota é existente no banco e se é do usuário
        const noteDB = await Notes.findOne({
            where: {UserId: userId, id: noteId, deleteAt: null},
        })

        if(!noteDB){
            throw new AppErro('Nota não encontrada!', 404, 'NOT_FUND')
        }

        await Notes.update({deleteAt: new Date()}, {where: {id: noteDB.id}})
    }
}
