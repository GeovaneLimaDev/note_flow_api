import { TrashService } from "../service/trashService.js"

export class TrashController {
    static async getAllTrash(req, res, next) {
        try {
            const userId =  req.userid
            const arrayTrash = await TrashService.getAllTrash(userId)

            res.status(200).json(arrayTrash)
        } catch (err) {
            next(err)
        }
    }

    static async restoreNote(req, res, next) {
        try {
            const noteId = req.params.noteId
            const userId = req.userid
            await TrashService.restoreNote(noteId, userId)

            res.status(200).json({
                message: "Nota restaurada com sucesso!" 
            })
        } catch (err) {
            next(err)
        }
    }

    static async restoreDocument(req, res, next) {
        try {
            const docId = req.params.docId
            const userId = req.userid
            await TrashService.restoreDocument(userId, docId)

            res.status(200).json({
                message: "Documento restaurada com sucesso!" 
            })
        } catch (err) {
            next(err)
        }
    }
}