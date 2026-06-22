import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const Folders = conn.define('Folders', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}) 

export default (Folders)