import express from "express"
import { TrashController } from "../controller/trashController.js"
import { AuthToken } from "../middlewares/authMiddware.js"

export const TrashRouter = express.Router()

TrashRouter.get('/', AuthToken,  TrashController.getAllTrash)
TrashRouter.patch('/note/:noteId/restore', AuthToken,  TrashController.restoreNote)
TrashRouter.patch('/document/:docId/restore', AuthToken,  TrashController.restoreDocument)
