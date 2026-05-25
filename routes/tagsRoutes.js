import express from "express" 
import {TagsController} from "../controller/tagsController.js"
import { AuthToken } from "../middlewares/authMiddware.js"
export const TagsRoutes = express.Router()

TagsRoutes.post('/', AuthToken, TagsController.createTag)
TagsRoutes.delete('/:id', AuthToken, TagsController.deleteTag)
TagsRoutes.get('/', AuthToken, TagsController.getTag)