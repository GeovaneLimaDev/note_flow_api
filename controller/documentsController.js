import { DocumentsService } from "../service/documentsService.js"
import { Note_Tag_Service } from "../service/tagReportService.js"
import { TagsService } from "../service/tagsService.js"

export class DocumentsController {
    //cria documento 
    static async createDocument(req, res, next) {
        try {
            const userId = req.userid
            const docData = req.body
            const document = await DocumentsService.createDocument(userId, docData)

            res.status(200).json('Documento criado com sucesso!')
        } catch (err) {
            next(err)
        }
    }
    //busca todos os documentos
    static async getDocumentsAll(req, res, next) {
        try {
            const userId = req.userid
            const docsArray = await DocumentsService.getDocumentsAll(userId)

            res.status(200).json(docsArray)
        } catch (err) {
            next(err)
        }
    }
    // busca apenas um documento
    static async getDocuments(req, res, next) {
        try {
            const docId = req.params.id
            const userId = req.userid
            const document = await DocumentsService.getDocuments(docId, userId)

            res.status(200).json(document)
        } catch (err) {
            next(err)
        }
    }
    //deleta um documento 
    static async deleteDocument(req, res, next) {
        try {
            const docId = req.params.id
            const userId = req.userid
            await DocumentsService.deleteDocuments(docId, userId)

            res.status(200).json({
                menssage: 'Documento enviado para lixeira!'
            })
        } catch (err) {
            next(err)
        }
    }
    // edita documento
    static async updateDocument(req, res, next) {
        try {
            const docId = req.params.id
            const userId = req.userid
            const docData = req.body
            const newDoc = await DocumentsService.updateDocument(docId, userId, docData)

            res.status(200).json({
                menssage: 'Documento atualizado com sucesso!',
                document: newDoc
            })
        } catch (err) {
            next(err)
        }
    }
    //remove a relação entre um documento e uma tag
    static async removeTagOfDoc(req, res, next) {
        try {
            const docId = req.params.docId
            const userId = req.userid
            const tagId = req.params.tagId
            const type = 'document'

            await Note_Tag_Service.removeTagOfNoteOrDoc(docId, tagId, userId, type)

            res.status(200).json({
                menssage: 'Tag removida com sucesso!'
            })
        } catch (err) {
            next(err)
        }
    }
    //adiciona uma relação entre um documento e uma tag
    static async addTagOfDoc(req, res, next) {
        try {
            const userId = req.userid
            const docId = req.params.docId
            const tags = req.body.tags
            const type = 'document'

            await Note_Tag_Service.addTagOfNoteOrDoc(docId, tags, userId, type)

            res.status(200).json({
                menssage: 'Tag adicionada com sucesso!'
            })
        } catch (err) {
            next(err)
        }
    }
    //arquivando documento
    static async archiveDocument(req, res, next) {
        try {
            const userId = req.userid
            const docId = req.params.docId
            const archive = req.body.archive

            const message = await DocumentsService.archiveDocument(docId, userId, archive)

            res.status(200).json({
                menssage: message
            })
        } catch (err) {
            next(err)
        }
    }
}  