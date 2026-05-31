import { where } from "sequelize";
import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import Tags from "../model/Tags.js";
import { NoteDocValidator } from "../validators/noteDocValidator.js";
import { TagsService } from "./tagsService.js";

export class DocumentsService {
    //cria documentos
    static async createDocument(userId, docData){
        //valida titulo 
        const title = NoteDocValidator.title(docData.title)
        //valida tags
        const tagsId = await TagsService.addTag(docData.tags, userId)
        //cria objeto que sera salvo no banco
        const createDoc = {
            title: title,
            content: docData.content,
            type: 'document',
            UserId: userId,
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
        //verificando body
        if(!docData) {
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        const keys = Object.keys(docData)
        const field = keys.find(item => item === 'title' || item === 'content')
        if(keys.length === 0 || !field){
            throw new AppErro('Dados necessários não enviados!', 400, 'EMPTY_BODY')
        }
        //verificando existencia no banco  
        const docDB = await Documents.findOne({
            where: {UserId: userId, id: docId, deleteAt: null}
        })
        if(!docDB) {
            throw new AppErro('Documento não existente!', 404, 'NOT_FOUND')
        }
        //validando dados enviados pelo usuário 
        const updateData = {
            title: docData.title ? await NoteDocValidator.title(docData.title) : docDB.title,
            content: docData.content ? docData.content.trim() : docDB.content
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
}