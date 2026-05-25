import express from "express"
import { conn } from "./db/connection.js"
import { errorHandler } from "./middlewares/errorMiddleware.js"

// relação das tabelas 
import './db/index.js'

import { UserRoutes } from "./routes/userRoutes.js"
import { NotesRoutes } from "./routes/notesRoutes.js"
import { TagsRoutes } from "./routes/tagsRoutes.js"

import dotenv from "dotenv"

export const app = express()

dotenv.config()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


//routes
app.use('/tags', TagsRoutes)
app.use('/notes', NotesRoutes)
app.use('/', UserRoutes)

//conf. do middleware de erro 
app.use(errorHandler)