import { NotesService } from "../service/notesService.js"

export class NotesController {
    static createNotes(req, res, next) {
        try {
            const userId = req.userid
            const newNote = req.body 
            const result = NotesService.createNotes(userId, newNote)

            res.status(201).json({message: "Nota criada com sucesso!"})
        }catch (err) {
            next(err)
        }
    }

    static async getNotes(req, res, next) {
        try{
            const userId = req.userid
            const NotesArray = await NotesService.getNotesAll(userId)

            res.status(200).json(NotesArray)
        }catch(err){
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
}