import express from 'express'
import { NotesController } from '../controller/notesController.js'
import { AuthToken } from '../middlewares/authMiddware.js'
import { NotesValidator } from '../validators/notesValidator.js'

export const NotesRoutes = express.Router()

NotesRoutes.post('/', AuthToken, NotesValidator.createNote, NotesController.createNotes)
NotesRoutes.get('/', AuthToken, NotesController.getNotesAll)
NotesRoutes.get('/:id', AuthToken, NotesController.getNote)
NotesRoutes.patch('/:id', AuthToken, NotesValidator.updateNote, NotesController.updateNotes )
NotesRoutes.delete('/:id', AuthToken, NotesController.deleteNotes)
NotesRoutes.delete('/:noteId/tag/:tagId', AuthToken, NotesController.removeTagOfNote)
NotesRoutes.patch('/:noteId/tag', AuthToken, NotesController.addTagOfNote)
NotesRoutes.patch('/:noteId/archive', AuthToken, NotesValidator.archiveNote, NotesController.archiveNote)
