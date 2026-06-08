import { truncates } from "bcryptjs"
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

    static async getVersionsAll(req, res, next) {
        try {
            const userId = req.userid
            const docId = req.params.docId

            const versions = await DocumentVersionService.getVersionsAll(userId, docId)
            res.status(200).json(versions)
        } catch (err) {
            next(err)
        }
    }

    static async getVersionsOne(req, res, next) {
        try {
            const userId = req.userid
            const versionId = req.params.versionId

            const version = await DocumentVersionService.getVersionsOne(userId, versionId)
            res.status(200).json(version)
        } catch (err) {
            next(err)
        }
    }

    static async deleteVersion(req, res, next){
        try {
            const userId = req.userid
            const versionId = req.params.versionId
            await DocumentVersionService.deleteVersion(userId, versionId)            
            res.status(200).json({
                message: 'Versão deletada com sucesso!'
            })
        } catch (err) {
            next(err)
        }
    }

    static async restoreVersion(req, res, next) {
        try {
            const userId = req.userid
            const versionId = req.params.versionId
            const document = await DocumentVersionService.restoreVersion(userId, versionId)            
            res.status(200).json({
                message: 'Versão restaurada com sucesso!',
                document: document
            })
        } catch (err) {
            next(err)
        }
    }

    static async updateVersion(req, res, next) {
        try {
            const userId = req.userid
            const versionId = req.params.versionId
            const {titleVersion} = req.body
            await DocumentVersionService.updateVersion(userId, versionId, titleVersion)

            res.status(200).json({
                message: "Titulo de versão atualizada com sucesso!"
            })
        } catch (err) {
            next(err)
        }
    }
}