import { NotesService } from "../service/notesService.js"

export class NotesController {
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

    static async getNotesAll(req, res, next) {
        try{
            const userId = req.userid
            const NotesArray = await NotesService.getNotesAll(userId)

            res.status(200).json(NotesArray)
        }catch(err){
            next(err)
        }
    }

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

    static async updateNotes(req, res, next) {
        try {
            const userId = req.userid
            const noteId = req.params.id
            const noteUp = req.body
            const result = await NotesService.updateNotes(userId, noteId, noteUp)

            res.status(200).json({
                message: 'Update realizado com sucesso!',
                result
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteNotes(req, res, next) {
        try {
            const noteId = req.params.id
            const userId = req.userid
            await NotesService.deleteNotes(userId, noteId)

            res.status(200).json({
                message: 'Nota deletada com sucesso!'
            })
        } catch (err) {
            next(err)
        }
    }
}