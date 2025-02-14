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

// rota para criacao de tarefas
app.post('/todos', async(req, res) => {

    const { texto, dificuldade } = req.body;

    if(!texto || !dificuldade) {
        res.send(`<div class="alert alert-danger" role="alert">texto e dificuldade sao obrigatorias</div>`)
        return;
    }

    try {
        
        const novaTarefa = await Todo.create({
            texto,
            dificuldade,
            completa: false
        })

        res.send(`<div class="alert alert-success" role="alert">Tarefa ${novaTarefa.texto} criada com sucesso</div>`)

    } catch (error) {
        res.send(`<div class="alert alert-danger" role="alert">erro ao criar tarefa</div>`)
    }

})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`servidor rodando na porta : ${port}`)
    })
})