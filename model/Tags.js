import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const Tags = conn.define('Tags', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default (Tags) 