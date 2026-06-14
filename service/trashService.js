import Documents from "../model/Documents.js";
import { Op } from 'sequelize'
import Notes from "../model/Notes.js";
import { AppErro } from "../error/appError.js";

export class TrashService {
    static async getAllTrash(userId) {
        const docsDB = await Documents.findAll({
            where: {
                UserId: userId,
                deleteAt: {[Op.ne]: null}
            }
        })

        const notesDB = await Notes.findAll({
            where: {
                UserId: userId,
                deleteAt: {
                    [Op.ne]: null
                }
            }
        })

        if(!docsDB && !notesDB){
            return {
                message: 'Não tem nenhum item na lixeira!'
            }
        }

        const arrayAll = docsDB.concat(notesDB)
        const arrayOrganized = arrayAll.sort((a, b) => b.deleteAt - a.deleteAt)
        
        return arrayOrganized
    }

    static async restoreNote(userId, noteId) {
        const noteDB = await Notes.findOne({
            where: {
                UserId: userId,
                id: noteId,
                deleteAt: {
                    [Op.ne]: null
                } 
            }
        })

        if(!noteDB){
            throw new AppErro('Nota não encontrada no banco!', 404, 'NOT_FUND')
        }

        await Notes.update({deleteAt: null}, {where: {id: noteId}})
    }

    static async restoreDocument(userId, docId) {
        const docDB = await Documents.findOne({
            where: {
                UserId: userId,
                id: docId,
                deleteAt: {
                    [Op.ne]: null
                } 
            }
        })

        if(!docDB){
            throw new AppErro('Documento não encontrada no banco!', 404, 'NOT_FUND')
        }

        await Documents.update({deleteAt: null}, {where: {id: docId}})
    }
}