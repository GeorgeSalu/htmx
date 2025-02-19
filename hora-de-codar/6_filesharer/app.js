const express = require("express");
const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session);

const app = express();
const port = 3000;

// gerenciamento da secao

// configuracao ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// caminho para arquivos

// rotas
app.get("/", (req, res) => {

    res.render("layout", { title: "Home", template: "index" });
})

app.listen(port, () => {
    console.log(`servidor inicializado na porta ${port}`)
})