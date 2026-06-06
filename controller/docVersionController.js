import { DocumentVersionService } from "../service/docVersionService.js"

export class DocumentVersionController {
    static async addVersion(req, res, next){
        try {
            const versionData = req.body
            const userId = req.userid 
            const result = await DocumentVersionService.addVersion(versionData, userId)

            res.status(201).json('Versão salva com sucesso!')
        } catch (err) {
            next(err)
        }
    }

    static async getVersions(req, res, next) {
        try {
            const userId = req.userid
            const docId = req.params.id

            const versions = await DocumentVersionService.getVersions(userId, docId)
            res.json(versions)
        } catch (err) {
            next(err)
        }
    }
}