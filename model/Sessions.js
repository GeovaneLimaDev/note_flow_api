import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const Sessions = conn.define('Session', {
    hashToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default (Sessions)