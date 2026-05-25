import User from "../model/User.js";
import Notes from "../model/Notes.js";
import Tags from "../model/Tags.js";
import { conn } from "./connection.js";

// relações user
User.hasMany(Notes)

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