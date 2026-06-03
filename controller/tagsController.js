import { truncates } from "bcryptjs"
import { TagsService } from "../service/tagsService.js"

export class TagsController{
    static async createTag (req, res, next) {
        try {
            const tag = req.body.name
            const userId= req.userid
            const tagCreate = await TagsService.createTag(tag, userId)

            res.status(200).json({
                message: 'Tag criada com sucesso!',
                tag: tagCreate
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteTag(req, res, next) {
        try {
            const tagId = req.params.id
            const userId = req.userid
            await TagsService.deleteTag(tagId, userId)

            res.json( {message: 'Tag deletada com sucesso!'})
        } catch (err) {
            next(err)
        }
    }

    static async getTag(req, res, next) {
        try {
            const userId = req.userid
            const tagsArray = await TagsService.getTagsAll(userId)

            res.status(200).json(tagsArray)
        } catch (err) {
            next(err)
        } 
    }
}