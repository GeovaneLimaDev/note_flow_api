import { Op } from "sequelize";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import { AppErro } from "../error/appError.js";
import Documents from "../model/Documents.js";
import Folders from "../model/Folders.js";

export class SearchService {
    static async getAll (userId, search, tagId){
        //validando existencia da tag
        if(tagId){
            const tagDB = await Tags.findOne({where: {id: tagId, UserId: userId}})

            if(!tagDB) {
                throw new AppErro('Teg não encontrada!', 404, 'NOT_FOUND');
        }}

        const where = {
            UserId: userId,
            title: {[Op.like]: `%${search ? search.toLowerCase() : ""}%`}
        }
        
        let include = null
        if(tagId) {
            include = [{
                model: Tags,
                attributes: [],
                where: {id: tagId}
            }]
        }
        
        
        const notesDB = await Notes.findAll({
            where: where,
            include: include       
        })

        const docDB = await Documents.findAll({
            where: where,
            include: include 
        })

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