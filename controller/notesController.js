import { NotesService } from "../service/notesService.js"
import {Note_Tag_Service} from "../service/tagReportService.js"

export class NotesController {
    //cria nota
    static async createNotes(req, res, next) {
        try {
            const userId = req.userid
            const newNote = req.body 
            const result = await NotesService.createNotes(userId, newNote)

            res.status(201).json({message: "Nota criada com sucesso!"})
        }catch (err) {
            next(err)
        }
    }
    //busca todas as notas
    static async getNotesAll(req, res, next) {
        try{
            const userId = req.userid
            const NotesArray = await NotesService.getNotesAll(userId)

            res.status(200).json(NotesArray)
        }catch(err){
            next(err)
        }
    }
    //busca um nota específica 
    static async getNote(req, res, next) {
        try {
            const userId = req.userid
            const noteId = req.params.id
            const result = await NotesService.getNote(userId, noteId)

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    //edita nota 
    static async updateNotes(req, res, next) {
        try {
            const userId = req.userid
            const noteId = req.params.id
            const noteUp = req.body
            const result = await NotesService.updateNotes(userId, noteId, noteUp)

            res.status(200).json({
                message: 'Update realizado com sucesso!',
                note: result
            })
        } catch (err) {
            next(err)
        }
    }
    //deleta nota
    static async deleteNotes(req, res, next) {
        try {
            const noteId = req.params.id
            const userId = req.userid
            await NotesService.deleteNotes(userId, noteId)

            res.status(200).json({
                message: 'Nota enviada para lixeira!'
            })
        } catch (err) {
            next(err)
        }
    }
    //remove tag da nota sem deletar nenhuma entidade
    static async removeTagOfNote(req, res, next) {
        try {
            const noteId = req.params.noteId
            const tagId = req.params.tagId
            const userId = req.userid
            const type = 'note'

            await Note_Tag_Service.removeTagOfNoteOrDoc(noteId, tagId, userId, type)
            res.status(200).json('Tag removida com sucesso!')
        } catch (err) {
            next(err)
        }
    }
    //adicona tag a alguma nota
    static async addTagOfNote(req, res, next) {
        try {
            const noteId = req.params.noteId
            const tags = req.body.tags
            const userId = req.userid
            const type = 'note'

            await Note_Tag_Service.addTagOfNoteOrDoc(noteId, tags, userId, type)
            
            res.status(200).json('Tag adicionada com sucesso!')
        } catch (err) {
            next(err)
        }
    }
    //arquivando nota
    static async archiveNote(req, res, next) {
        try {
            const noteId = req.params.noteId
            const userId = req.userid
            const archive = req.body.archive

            const message = await NotesService.archiveNote(noteId, userId, archive)

            res.status(200).json({
                message: message
            })
        } catch (err) {
            next(err)
        }
    }
}