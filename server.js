import { app } from "./app.js";
import { conn } from "./db/conn.js";

conn.sync().then(() => {
    app.listen(3000, (req, res) => {
      console.log('Server rodando!')
    })
}).catch((err) => {
    console.log(err)
})