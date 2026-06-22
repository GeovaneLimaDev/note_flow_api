import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import Folders from "../model/Folders.js";
import Notes from "../model/Notes.js";

export class FoldersService {
    //criação de pastas
    static async createFolder(userId, title){
        //verificando existência no banco
        const folderDB = await Folders.findOne({where: {UserId: userId, title: title.trim()}})

        if(folderDB) {
            throw new AppErro('Já existe uma pasta com esse titulo', 400, 'TITLE_IN_USE')
        }

        await Folders.create({
            UserId: userId,
            title: title.trim()
        })
    }

    //busca de todas as pastas
    static async getFoldersAll(userId) {
        // buscando no banco 
        const foldersDB = await Folders.findAll({where: {UserId: userId}})

        if(foldersDB.length === 0){
            return {
                messsage: 'O usuário não possui nenhuma pasta salva no sistema!'}
        }

        return foldersDB
    }

    //buscando uma pasta especifica com os arquivos
    static async getFolder(folderId, userId) {
        //verificando existencia no banco
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId,}, include: [Documents, Notes]})

        if(!folderDB) {
            throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND');
        }

        const files = folderDB.Documents.concat(folderDB.Notes) //juntando as notas e os documentos no mesmo array 
        const fileOrder = files.sort((a, b) => b.updatedAt - a.updatedAt) // ordenando por data de atualização
        
        const folderFiles = {
            id: folderDB.id,
            title: folderDB.title,
            createdAt: folderDB.createdAt,
            updatedAt: folderDB.updatedAt,
            files: fileOrder
        }

        return folderFiles
    }
    //renoameando pasta
    static async updateFolder(folderId, userId, newtitle) {
        //verificando existencia no banco 
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId,}})

        if(!folderDB) {
           throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND'); 
        }

        await Folders.update({title: newtitle.trim()}, {where: {UserId: userId, id: folderDB.id}})
    }
    //adicionando documento há pasta 
    static async addDocument(userId, folderId, docId) {
        //verificando existencia da pasta
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId}})

        if(!folderDB ){
            throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND')
        }

        //verificandio existencia do documento 
        const docDB = await Documents.findOne({where: {UserId: userId, id: docId}})

        if(!docDB) {
            throw new AppErro('Documento não existente no sistema', 404, 'NOT_FUND')
        }
        //esse documento já está nessa pasta? 
        if(docDB.FolderId === folderDB.id){
            throw new AppErro('Documento já está nesta pasta', 400, 'DOCUMENT_ALREADY_IN_FOLDER')
        }
        
        //adicionando doc há pasta
        await Documents.update({FolderId: folderId}, {where: {id: docId}})

        return {
            message: `Docuemnto adicionado há pasta ${folderDB.title}`
        }
    } 
    //adicionando nota há pasta 
    static async addNote(userId, folderId, noteId) {
        //verificando existencia da pasta
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId}})

        if(!folderDB ){
            throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND')
        }

        //verificandio existencia da nota 
        const noteDB = await Notes.findOne({where: {UserId: userId, id: noteId}})

        if(!noteDB) {
            throw new AppErro('Nota não existente no sistema', 404, 'NOT_FUND')
        }
        //essa nota já está nessa pasta? 
        if(noteDB.FolderId === folderDB.id){
            throw new AppErro('Nota já está nesta pasta', 400, 'NOTE_ALREADY_IN_FOLDER')
        }

        //adicionando nota há pasta
        await Notes.update({FolderId: folderId}, {where: {id: noteId}})

        return {
            message: `Nota adicionado há pasta ${folderDB.title}`
        }
    } 
    //removendo documento da pasta
    static async removeDocument(userId, folderId, docId) {
        //verificando existencia da pasta
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId}})
        if(!folderDB ){
            throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND')
        }
        //verificandio existencia do documento 
        const docDB = await Documents.findOne({where: {UserId: userId, id: docId}})

        if(!docDB) {
            throw new AppErro('Documento não existente no sistema', 404, 'NOT_FUND')
        }
        //esse documento esta em uma pasta mesmo?
        if(!docDB.FolderId){
            throw new AppErro('Documento não está em nenhuma pasta', 400, 'DOCUMENT_WITHOUT_FOLDER')  
        }
        //esse documento esta nessa pasta mesmo?
        if(docDB.FolderId !== folderDB.id) {
            throw new AppErro('Documento não pertence a esta pasta', 400, 'DOCUMENT_NOT_IN_FOLDER')
        }
        //removendo doc da pasta
        await Documents.update({FolderId: null}, {where: {id: docId}})

        return {
            message: `Docuemnto retirado da pasta ${folderDB.title}`
        }
    }
    //removendo nota da pasta 
    static async removeNote(userId, folderId, noteId){
        //verificando existencia da pasta
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId}})

        if(!folderDB ){
            throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND')
        }

        //verificandio existencia da nota 
        const noteDB = await Notes.findOne({where: {UserId: userId, id: noteId}})

        if(!noteDB) {
            throw new AppErro('Nota não existente no sistema', 404, 'NOT_FUND')
        }
        //esse Nota esta em uma pasta mesmo?
        if(!noteDB.FolderId){
            throw new AppErro('Nota não está em nenhuma pasta', 400, 'DOCUMENT_WITHOUT_FOLDER')  
        }
        //esse Nota esta nessa pasta mesmo?
        if(noteDB.FolderId !== folderDB.id) {
            throw new AppErro('Nota não pertence a esta pasta', 400, 'DOCUMENT_NOT_IN_FOLDER')
        }

        //adicionando nota há pasta
        await Notes.update({FolderId: null}, {where: {id: noteId}})

        return {
            message: `Nota removida da pasta ${folderDB.title}`
        }
    }
    //deletando pasta
    static async deleteFolder(userId, folderId){
        //validando existência no banco
        const folderDB = await Folders.findOne({where: {UserId: userId, id: folderId}})
        
        if(!folderDB) {
            throw new AppErro('Pasta não existente no sistema', 404, 'NOT_FUND')
        }

        await Folders.destroy({where: {id: folderId}})
        return {
            message: `Pasta ${folderDB.title} deletada!`
        }
    }
}