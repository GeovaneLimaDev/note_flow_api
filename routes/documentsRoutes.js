import express from "express"
import { DocumentsController } from "../controller/documentsController.js"
import { AuthToken } from "../middlewares/authMiddware.js"

export const DocumentsRouter = express.Router()

DocumentsRouter.post('/', AuthToken, DocumentsController.createDocument)
DocumentsRouter.get('/', AuthToken, DocumentsController.getDocumentsAll)
DocumentsRouter.get('/:id', AuthToken, DocumentsController.getDocuments)
DocumentsRouter.delete('/:id', AuthToken, DocumentsController.deleteDocument)
DocumentsRouter.patch('/:id', AuthToken, DocumentsController.updateDocument)
DocumentsRouter.delete('/:docId/tag/:tagId', AuthToken, DocumentsController.removeTagOfDoc)
DocumentsRouter.post('/:docId/tag/', AuthToken, DocumentsController.addTagOfDoc)