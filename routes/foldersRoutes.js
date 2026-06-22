import express from "express"
import { FoldersController } from "../controller/foldersController.js"
import { AuthToken } from "../middlewares/authMiddware.js"
import { FoldersValidator } from "../validators/foldersValidator.js"

export const FoldersRoutes = express.Router()

FoldersRoutes.post('/', AuthToken, FoldersValidator.titleFolders, FoldersController.createFolders)
FoldersRoutes.patch('/:id', AuthToken, FoldersValidator.titleFolders, FoldersController.updateFolder)
FoldersRoutes.get('/', AuthToken, FoldersController.getFoldersAll)
FoldersRoutes.get('/:id', AuthToken, FoldersController.getFolder)
FoldersRoutes.patch('/:folderId/document/:docId', AuthToken, FoldersController.addDocument)
FoldersRoutes.patch('/:folderId/note/:noteId', AuthToken, FoldersController.addNote) 
FoldersRoutes.delete('/:folderId/document/:docId', AuthToken, FoldersController.removeDocument) 
FoldersRoutes.delete('/:folderId/note/:noteId', AuthToken, FoldersController.removeNote)
FoldersRoutes.delete('/:folderId', AuthToken, FoldersController.deleteFolder)