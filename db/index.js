import User from "../model/User.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import Documents from "../model/Documents.js";
import { conn } from "./connection.js";

// relações user
User.hasMany(Notes)
User.hasMany(Documents)
User.hasMany(Tags)

//relações dos documentos 
Documents.belongsTo(User)
Documents.belongsToMany(Tags, {
    through: 'docs_tags',
    onDelete: 'CASCADE'
})

// Relações Notes
Notes.belongsTo(User)
Notes.belongsToMany(Tags, {
    through: 'note_tags',
    onDelete: 'CASCADE'
})

// relações tags
Tags.belongsTo(User)
Tags.belongsToMany(Notes, {
    through: 'note_tags',
    onDelete: 'CASCADE'
})
Tags.belongsToMany(Documents, {
    through: 'docs_tags',
    onDelete: 'CASCADE'
})