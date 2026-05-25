import express from 'express'
import { NotesController } from '../controller/notesController.js'
import { AuthToken } from '../middlewares/authMiddware.js'

export const NotesRoutes = express.Router()

NotesRoutes.post('/', AuthToken, NotesController.createNotes)
NotesRoutes.get('/', AuthToken, NotesController.getNotesAll)
NotesRoutes.get('/:id', AuthToken, NotesController.getNote)
NotesRoutes.patch('/:id', AuthToken, NotesController.updateNotes )
NotesRoutes.delete('/:id', AuthToken, NotesController.deleteNotes)
