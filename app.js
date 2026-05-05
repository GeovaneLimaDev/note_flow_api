import express from "express"
import { conn } from "./db/conn.js"

// models 
import User from "./model/User.js"
import Notes from "./model/Notes.js"
import Tags from "./model/Tags.js"
import { UserRoutes } from "./routes/userRoutes.js"

export const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//routes

app.use('/', UserRoutes)