import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";

const User = conn.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

export default (User)