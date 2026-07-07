import "dotenv/config";
import express from "express"
import { conn } from "./db/connection.js"
import { errorHandler } from "./middlewares/errorMiddleware.js"

// relação das tabelas 
import './db/index.js'

import { AuthRoutes } from "./routes/authRoutes.js"
import { UserRoutes } from "./routes/userRoutes.js"
import { NotesRoutes } from "./routes/notesRoutes.js"
import { TagsRoutes } from "./routes/tagsRoutes.js"
import { DocumentsRouter } from "./routes/documentsRoutes.js"
import { DocumentVersionRouter } from "./routes/DocVersionRouter.js"
import { TrashRouter } from "./routes/trashRouter.js"
import { FoldersRoutes } from "./routes/foldersRoutes.js"
import { SearchRouter } from "./routes/searchRoutes.js"


export const app = express()

//configurção do body em json
app.use(express.urlencoded({
    extended: true
})) 
app.use(express.json())

//routes
app.use('/search', SearchRouter)
app.use('/folders', FoldersRoutes)
app.use('/documents', DocumentVersionRouter)
app.use('/documents', DocumentsRouter)
app.use('/trash', TrashRouter)
app.use('/tags', TagsRoutes)
app.use('/notes', NotesRoutes)
app.use('/user', UserRoutes)
app.use('/auth', AuthRoutes)

//conf. do middleware de erro 
app.use(errorHandler)