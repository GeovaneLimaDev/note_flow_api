import { DataTypes } from "sequelize";
import { conn } from "../db/connection.js";

const TokenRecoveryPassword = conn.define('token_reocovery_password', {
    token: {
        type:  DataTypes.STRING,
        allowNull: false    
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false  
    }
})

export default (TokenRecoveryPassword)