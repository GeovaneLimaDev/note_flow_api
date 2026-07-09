import User from "../model/User.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import Documents from "../model/Documents.js";
import DocumentVersion from "../model/DocumentVersion.js";
import Folders from "../model/Folders.js";
import TokenRecoveryPassword from "../model/TokenRecoveryPassword.js";
import Sessions from "../model/Sessions.js";
import { conn } from "./connection.js";

// relações user
User.hasMany(Notes, {
    onDelete: 'CASCADE'
})
User.hasMany(Documents, {
    onDelete: 'CASCADE'
})
User.hasMany(Tags, {
    onDelete: 'CASCADE'
})
User.hasMany(DocumentVersion, {
    onDelete: 'CASCADE'
})
User.hasMany(Folders, {
    onDelete: 'CASCADE'
})
User.hasMany(TokenRecoveryPassword, {
    onDelete: 'CASCADE'
})
User.hasMany(Sessions, {
    onDelete: 'CASCADE'
})

//relações dos documentos 
Documents.belongsTo(User, {
    onDelete: 'CASCADE'
})
Documents.belongsTo(Folders, {
    onDelete: 'SET NULL'
})
Documents.hasMany(DocumentVersion, {
    onDelete: 'CASCADE'
})
Documents.belongsToMany(Tags, {
    through: 'docs_tags',
    onDelete: 'CASCADE'
})

// Relações Notes
Notes.belongsTo(User, {
    onDelete: 'CASCADE'
})
Notes.belongsTo(Folders, {
    onDelete: 'SET NULL'
})
Notes.belongsToMany(Tags, {
    through: 'note_tags',
    onDelete: 'CASCADE'
}) 

// relações tags
Tags.belongsTo(User, {
    onDelete: 'CASCADE'
})
Tags.belongsToMany(Notes, {
    through: 'note_tags',
    onDelete: 'CASCADE'
})
Tags.belongsToMany(Documents, {
    through: 'docs_tags',
    onDelete: 'CASCADE'
})

//relção das pastas 
Folders.belongsTo(User, {
    onDelete: 'CASCADE'
})
Folders.hasMany(Documents, {
    onDelete: 'SET NULL'
})
Folders.hasMany(Notes, {
    onDelete: 'SET NULL'
})

// relações das versões dos documentos
DocumentVersion.belongsTo(User, {
    onDelete: 'CASCADE'
})
DocumentVersion.belongsTo(Documents, {
    onDelete: 'CASCADE'
})

//relação dos tokens de recuperação de senha
TokenRecoveryPassword.belongsTo(User, {
    onDelete: 'CASCADE'
})

//relação das sessões
Sessions.belongsTo(User, {
    onDelete: 'CASCADE'
})