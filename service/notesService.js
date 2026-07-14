import { where } from "sequelize";
import { AppErro } from "../error/appError.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import { TagsService } from "./tagsService.js";


export class NotesService {
    //criando nota
    static async createNotes(userId, note) {
        const newNote = {
            title: note.title.trim().toLowerCase(),
            content: note.content,
            UserId: userId,
            deleteAt: null,
            type: 'note',
            archive: false
        }
        
        const newCreate = await Notes.create(newNote) //salvar no banco
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
        //verificando existencia da nota no banco 
        const noteDB = await Notes.findOne({
            where: {UserId: userId, id: noteId, deleteAt: null},
        }) 
        if(!noteDB) {
            throw new AppErro('Nota não existente!', 404, 'NOT_FOUND')
        }

        const updateData = {
            title: noteData.title ? noteData.title.trim() : noteDB.title,
            content: noteData.content
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
    //arquivando nota
    static async archiveNote(noteId, userId, archive){
        const note = await Notes.findOne({
            where: {UserId: userId, id: noteId}
        })

        if(!note) {
            throw new AppErro('Nota não existente!', 404, 'NOT_FOUND')
        }

        if(archive){
            await Notes.update({archive: true}, {where: {id: noteId}})
            return 'Nota arquivada com sucesso!'
        }else{
            await Notes.update({archive: false}, {where: {id: noteId}})
            return "Nota retirada dos arquivados!"
        }
    }
}
