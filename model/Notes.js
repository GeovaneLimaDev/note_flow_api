import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const Notes = conn.define('Notes', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    }
})



export default (Notes)