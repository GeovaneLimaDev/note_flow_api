import express from "express"
import { conn } from "./db/conn.js"
import { errorHandler } from "./middlewares/errorMiddleware.js"

// models 
import User from "./model/User.js"
import Notes from "./model/Notes.js"
import Tags from "./model/Tags.js"

import { UserRoutes } from "./routes/userRoutes.js"
import { NotesRoutes } from "./routes/notesRoutes.js"
import dotenv from "dotenv"

export const app = express()

dotenv.config()
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


//routes
app.use('/notes', NotesRoutes)
app.use('/', UserRoutes)

//conf. do middleware de erro 
app.use(errorHandler)