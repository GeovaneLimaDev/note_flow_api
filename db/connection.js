import { Sequelize } from "sequelize";

export const conn = new Sequelize('note_flow', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

try {
    conn.authenticate()
} catch (error) {
    console.log(err)
}