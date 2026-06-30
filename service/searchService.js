import { Op } from "sequelize";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import Folders from "../model/Folders.js";

export class SearchService {
    static async getAll (userId, search, tagId){
        if(!tagId){//validando existencia da tag
            const tagDB = await Tags.findOne({where: {id: tagId, UserId: userId}})

            if(!tagDB) {
                throw new AppErro('Teg não encontrada!', 404, 'NOT_FOUND');
        }}

        const where = {
            UserId: userId,
            title: {[Op.like]: `%${search ? search.toLowerCase() : ""}%`}
        }
        
        const notesDB = await Notes.findAll({
            where: where,
            include: [{
                model: Tags,
                attributes: [],
                where: {id: tagId}
                
        }]})

        const docDB = await Documents.findAll({
            where: where,
            include: [{
                model: Tags,
                attributes: [],
                where: {id: tagId}
                
        }]})

        const folderDB = await Folders.findAll({
            where: where
        })
        
        const arrays = {
            folders: folderDB,
            documents: docDB,
            notes: notesDB
        }
        return arrays
    }
}