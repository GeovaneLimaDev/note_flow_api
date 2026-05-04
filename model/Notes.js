import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";
import User from "./User.js";

const Notes = conn.define('Notes', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Notes.belongsTo(User)
User.hasMany(Notes)

export default (Notes)