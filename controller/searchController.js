import { SearchService } from "../service/searchService.js"

export class SearchController {
    static async getAll(req, res, next) {
        try {
            const q = req.query.q
            const tagId = req.query.tagId 
            const userId = req.userid

            const result = await SearchService.getAll(userId, q, tagId)
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
}