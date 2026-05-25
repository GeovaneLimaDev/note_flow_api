export class TagsController{
    static createTag (req, res, next) {
        try {
            const tag = req.body
        } catch (err) {
            next(err)
        }
    }
}