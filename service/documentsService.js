import { where } from "sequelize";
import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import Tags from "../model/Tags.js";
import { NotesValidator } from "../validators/notesValidator.js";
import { TagsService } from "./tagsService.js";

export class DocumentsService {
    //cria documentos
    static async createDocument(userId, docData){
        const tagsId = await TagsService.addTag(docData.tags, userId)
        //cria objeto que sera salvo no banco
        const createDoc = {
            title: docData.title.trim(),
            content: docData.content,
            type: 'document',
            UserId: userId,
            deleteAt: null,
            archive: false
        }

        const newDoc = await Documents.create(createDoc)

        await newDoc.addTag(tagsId)
    }
    //buscando todos os documentos
    static async getDocumentsAll(userId) {
        const docs = await Documents.findAll({
            where: {UserId: userId, deleteAt: null},
            include: Tags
        })

        if(docs.length === 0) {
            return{
                message: 'O usuário não tem documentos salvos até o momento'
            }
        }

        return docs
    }
    //buscando um documento
    static async getDocuments(docId, userId) {
        const document = await Documents.findOne({
            where: {UserId: userId, id: docId, deleteAt: null},
            include: Tags
        })

        if(!document) {
            throw new AppErro('Documento não existente!', 404, "NOT_FUND")
        }

        return document
    }
    //deletando documento
    static async deleteDocuments(docId, userId) {
        const document = await Documents.findOne({
            where: {UserId: userId, id: docId, deleteAt: null}
        })

        if(!document) {
            throw new AppErro('Documento não existente!', 404, "NOT_FUND")
        }

        await Documents.update({deleteAt: new Date()}, {where: {id: docId}})
    }
    //editar documento
    static async updateDocument(docId, userId, docData) {
        //verificando existencia no banco  
        const docDB = await Documents.findOne({
            where: {UserId: userId, id: docId, deleteAt: null}
        })
        if(!docDB) {
            throw new AppErro('Documento não existente!', 404, 'NOT_FOUND')
        }
        //validando dados enviados pelo usuário 
        const updateData = {
            title: docData.title ? docData.title.trim() : docDB.title,
            content: docData.content 
        }

        await Documents.update(updateData, {where: {id: docId}})
        const newDoc = {
            title: updateData.title,
            content: updateData.content,
            id: docId,
            userId: userId
        }

        return newDoc
    }
    //arquivando nota
    static async archiveDocument(docId, userId, archive){
        const docDB = await Documents.findOne({
            where: {UserId: userId, id: docId}
        })

        if(!docDB) {
            throw new AppErro('Documento não existente!', 404, 'NOT_FOUND')
        }

        if(archive){
            await Documents.update({archive: true}, {where: {id: docId}})
            return 'Documento arquivado com sucesso!'
        }else{
            await Documents.update({archive: false}, {where: {id: docId}})
            return 'Documento retirado dos arquivados!'
        }
    }
}