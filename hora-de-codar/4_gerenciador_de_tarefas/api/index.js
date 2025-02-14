const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express()
const port = 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

// conexao com sqlite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite",
})

// Model
const Todo = sequelize.define("Todo", {
    texto: DataTypes.STRING,
    dificuldade: DataTypes.STRING,
    completa: DataTypes.BOOLEAN,
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`servidor rodando na porta : ${port}`)
    })
})