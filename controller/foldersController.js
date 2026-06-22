import { FoldersService } from "../service/foldersService.js"

export class FoldersController {
    static async createFolders(req, res, next){
        try {
            const title = req.body.title
            const userId = req.userid

            await FoldersService.createFolder(userId, title)
            res.status(200).json({
                message: "Pasta criada!"
            })
        } catch (err) {
            next(err)
        }
    }

    static async getFoldersAll(req, res, next) {
        try {
            const userId = req.userid
            const foldersArray = await FoldersService.getFoldersAll(userId)

            res.status(200).json(foldersArray)
        } catch (err) {
            next(err)
        }
    }

    static async getFolder(req, res, next) {
        try {
            const folderId = req.params.id
            const userId = req.userid

            const folder = await FoldersService.getFolder(folderId, userId)
            res.status(200).json(folder) 
        } catch (err) {
            next(err)
        }
    }

    static async updateFolder(req, res, next) {
        try {
            const folderId = req.params.id
            const userId = req.userid
            const newTitle = req.body.title

            const folder = await FoldersService.updateFolder(folderId, userId, newTitle)
            res.status(200).json('Pasta renomeada!') 
        } catch (err) {
            next(err)
        }
    }

    static async addDocument(req, res, next) {
        try {
            const userId = req.userid
            const folderId = req.params.folderId
            const docId = req.params.docId
            const message = await FoldersService.addDocument(userId, folderId, docId)

            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

    static async addNote(req, res, next) {
        try {
            const userId = req.userid
            const folderId = req.params.folderId
            const noteId = req.params.noteId
            const message = await FoldersService.addNote(userId, folderId, noteId)

            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

    static async removeDocument(req, res, next){
        try {
            const userId = req.userid
            const folderId = req.params.folderId
            const docId = req.params.docId
            const message = await FoldersService.removeDocument(userId, folderId, docId)

            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

    static async removeNote(req, res, next) {
        try {
            const userId = req.userid
            const folderId = req.params.folderId
            const noteId = req.params.noteId
            const message = await FoldersService.removeNote(userId, folderId, noteId)

            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

    static async deleteFolder(req, res, next) {
        try {
            const userId = req.userid
            const folderId = req.params.folderId
            const message = await FoldersService.deleteFolder(userId, folderId)

            res.status(200).json(message)
        } catch (err) {
            next(err)
        }
    }

}