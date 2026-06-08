import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import DocumentVersion from "../model/DocumentVersion.js";
import { conn } from "../db/connection.js";

export class DocumentVersionService {
    //salvando versões no banco
    static async addVersion(versionData, userId) {
        //verificando existencia do documento
        const docDB = await Documents.findOne({
            where: {
                UserId: userId,
                id: versionData.documentId
            }
        })

        if(!docDB){
            throw new AppErro('Documento não existente!', 404, "NOT_FUND")
        }
        //adicionando ao banco a versão
        const newVersion = {
            titleVersion: versionData.titleVersion,
            UserId: userId,
            DocumentId: versionData.documentId,
            title: docDB.title,
            content: docDB.content
        }
        
        const docVersion = await DocumentVersion.create(newVersion)
    }
    //buscando todas as versões de um documento
    static async getVersionsAll(userId, docId){
        //verificando existencia no banco
        const docDB = await Documents.findOne({
            where: {
                UserId: userId,
                id: docId
            },
            include: DocumentVersion,
        })

        if(!docDB) {
            throw new AppErro('Documento não existente no banco!', 404, 'NOT_FUND')
        }
        
        if(docDB.Document_Versions.length === 0){
            return {
                message: 'Não exite versões salvas desse documento!'
            }
        }
        
        const docVersions = docDB.Document_Versions.sort((a, b) => b.createdAt - a.createdAt)

        return docVersions
    }
    //buscando uma versão expecifica de um documento
    static async getVersionsOne(userId, versionId) {
        //verificando existência da versão 
        const versionDB = await DocumentVersion.findOne({
            where: {
                UserId: userId,
                id: versionId
            }
        })

        if(!versionDB) {
            throw new AppErro('Versão não existente no banco', 404, 'NOT_FUND')
        }

        return versionDB
    }
    //deletando versão
    static async deleteVersion(userId, versionId) {
        //verificando exitencia no banco
        const versionDB = await DocumentVersion.findOne({
            where: {
                UserId: userId,
                id: versionId
            }
        })

        if(!versionDB){
            throw new AppErro('Versão não existente no banco', 404, 'NOT_FUND')
        }

        await DocumentVersion.destroy({
            where: {
                id: versionId
            }
        })
    }
    //restaurando versão 
    static async restoreVersion(userId, versionId){
        //verificando existencia no banco
        const versionDB = await DocumentVersion.findOne({
            where: {
                UserId: userId,
                id: versionId
            },
            include: Documents
        })
        
        if(!versionDB){
            throw new AppErro('Versão não existente no banco', 404, 'NOT_FUND')
        }
        const document = versionDB.Document

        if(!document){
            throw new AppErro('Documento não existente no banco!', 404, 'NOT_FUND')
        }
        //salvando versão atual no banco como versão
        const transaction = await conn.transaction()

        try {

            const newVersion = {
            title: document.title,
            content: document.content,
            UserId: userId,
            DocumentId: document.id,
            titleVersion: `Restauração ${new Date().toISOString()}`
            }

            await DocumentVersion.create(newVersion, {transaction})
            //restaurando versão
            const newDocument = {
                title: versionDB.title,
                content: versionDB.content
            }

            await Documents.update(newDocument, {
                where: {
                    id: document.id
                },
                transaction
            })

            await transaction.commit()

            return {
                id: document.id,
                title: versionDB.title,
                content: versionDB.content,
                userId: document.UserId
            }

        } catch (err) {
            await transaction.rollback()
            throw new AppErro('Ops, tivemos algum problema, tente novamente mais tarde!', 500, 'INTERNAL_PROBLEM')
        }
    }
    //editando titulo da versão
    static async updateVersion(userId, versionId, titleVersion) {
        const versionDB = await DocumentVersion.findOne({
            where: {
                UserId: userId,
                id: versionId 
            }
        })

        if(!versionDB) {
            throw new AppErro('Versão não existente no banco', 404, 'NOT_FUND')
        }

        await DocumentVersion.update({titleVersion: titleVersion}, {
            where: {id: versionId}
        })
    }
} 