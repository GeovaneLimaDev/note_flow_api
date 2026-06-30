import express from "express"
import { SearchController } from "../controller/searchController.js"
import { AuthToken } from "../middlewares/authMiddware.js"

export const SearchRouter = express.Router() 

SearchRouter.get('/', AuthToken, SearchController.getAll) 
