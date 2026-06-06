import express from "express"
import { DocumentVersionController } from "../controller/docVersionController.js"
import { AuthToken } from "../middlewares/authMiddware.js"
import { DocumentVersionValidator } from "../validators/docVersionValidatior.js"

export const DocumentVersionRouter = express.Router()

DocumentVersionRouter.post('/', AuthToken, DocumentVersionValidator.addVersion, DocumentVersionController.addVersion)
DocumentVersionRouter.get('/:id', AuthToken, DocumentVersionController.getVersions)