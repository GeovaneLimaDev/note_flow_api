import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";
import User from "./User.js";
import Notes from "./Notes.js";

const Tags = conn.define('Tags', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Tags.belongsTo(User)
User.hasMany(Tags)

export default (Tags) 