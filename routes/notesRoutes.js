import express from 'express'
import { NotesController } from '../controller/notesController.js'
import { AuthToken } from '../middlewares/authMiddware.js'

export const NotesRoutes = express.Router()

NotesRoutes.post('/create', AuthToken, NotesController.createNotes)
NotesRoutes.get('/', AuthToken, NotesController.getNotes)
NotesRoutes.patch('/:id', AuthToken, NotesController.updateNotes )
