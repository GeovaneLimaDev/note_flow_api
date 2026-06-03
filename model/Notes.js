import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const Notes = conn.define('Notes', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    },
    deleteAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    archive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})



export default (Notes)