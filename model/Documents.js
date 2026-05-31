import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const Documents = conn.define('Documents', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    deleteAt: {
        type: DataTypes.DATE,
        allowNull: true
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default (Documents)