import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import DocumentVersion from "../model/DocumentVersion.js";

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
    //buscando versões de um documento
    static async getVersions(userId, docId){
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
} 