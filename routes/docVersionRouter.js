import express from "express"
import { DocumentVersionController } from "../controller/docVersionController.js"
import { AuthToken } from "../middlewares/authMiddware.js"
import { DocumentVersionValidator } from "../validators/docVersionValidatior.js"

export const DocumentVersionRouter = express.Router()

DocumentVersionRouter.post('/version', AuthToken, DocumentVersionValidator.addVersion, DocumentVersionController.addVersion)
DocumentVersionRouter.get('/:docId/version', AuthToken, DocumentVersionController.getVersionsAll)
DocumentVersionRouter.get('/version/:versionId', AuthToken, DocumentVersionController.getVersionsOne)
DocumentVersionRouter.delete('/version/:versionId', AuthToken, DocumentVersionController.deleteVersion)
DocumentVersionRouter.put('/version/:versionId/restore', AuthToken, DocumentVersionController.restoreVersion)
DocumentVersionRouter.patch('/version/:versionId', AuthToken, DocumentVersionValidator.updateVersion ,DocumentVersionController.updateVersion)
