import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";

const NoteTags = conn.define('Note_tags', {
    noteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default (NoteTags)