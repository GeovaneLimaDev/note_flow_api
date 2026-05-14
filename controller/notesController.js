import { NotesService } from "../service/notesService.js"

export class NotesController {
    static createNotes(req, res, next) {
        try {
            const userId = req.userid
            const newNote = req.body 
            const result = NotesService.createNotes(userId, newNote)

            res.status(201).json({message: "Nota criada com sucesso!"})
        } catch (err) {
            next(err)
        }
    }
}