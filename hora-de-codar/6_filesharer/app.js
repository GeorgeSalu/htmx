const express = require("express");
const sessions = require("express-session")
const SQLiteStore = require("connect-sqlite3")(sessions);

const app = express();
const port = 3000;

// gerenciamento da secao

// configuracao ejs
app.set("view angine", "ejs")

//middlewares
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// caminho para arquivos

// rotas

app.listen(port, () => {
    console.log(`servidor inicializado na porta ${port}`)
})