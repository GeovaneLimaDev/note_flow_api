import User from "../model/User.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import Documents from "../model/Documents.js";
import DocumentVersion from "../model/DocumentVersion.js";
import Folders from "../model/Folders.js";
import { conn } from "./connection.js";

// relações user
User.hasMany(Notes)
User.hasMany(Documents)
User.hasMany(Tags)
User.hasMany(DocumentVersion)
User.hasMany(Folders)

//relações dos documentos 
Documents.belongsTo(User)
Documents.belongsTo(Folders, {
    onDelete: 'SET NULL'
})
Documents.hasMany(DocumentVersion)
Documents.belongsToMany(Tags, {
    through: 'docs_tags',
    onDelete: 'CASCADE'
})

// Relações Notes
Notes.belongsTo(User)
Notes.belongsTo(Folders, {
    onDelete: 'SET NULL'
})
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

//relção das pastas 
Folders.hasMany(Documents, {
    onDelete: 'SET NULL'
})
Folders.hasMany(Notes, {
    onDelete: 'SET NULL'
})

// relações das versões dos documentos
DocumentVersion.belongsTo(User)
DocumentVersion.belongsTo(Documents)