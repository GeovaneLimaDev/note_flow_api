import { DataTypes, TINYINT } from "sequelize";
import { conn } from "../db/connection.js";

const DocumentVersion = conn.define('Document_Version', {
    titleVersion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}) 

export default (DocumentVersion)