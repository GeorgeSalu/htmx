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

// trazer tarefas
app.get('/todos', async(req, res) => {
    try {
        
        const tarefas = await Todo.findAll();

        if(tarefas.length === 0) {
            res.send(`
                <div class="alert alert-danger" role="alert">nao existe tarefa cadastrada</div>
            `);
            return;
        }


        let html = tarefas.map((tarefa) => `
            <div class="card mb-3 ${tarefa.completa ? "bg-light border-success" : ""}">
                <div class="card-body ${tarefa.completa ? "font-italic" : ""}">
                    <h5 class="card-title">Tarefa : ${tarefa.texto}</h5>
                    <p class="card-text">Dificuldade: ${tarefa.dificuldade}</p>
                    <p class="card-text">Status: ${tarefa.completa ? "Completa" : "Incompleta"}</p>

                    <button class="btn btn-primary" onclick="editarTarefa(${tarefa.id}, '${tarefa.texto}', '${tarefa.dificuldade}')">Editar</button>
                    <button class="btn btn-danger" onclick="deletarTarefa(${tarefa.id})">Deletar</button>
                    <button class="btn btn-secondary" onclick="toggleTarefa(${tarefa.id})">${tarefa.completa ? "Desmarcar" : "Marcar como completa"}</button>
                </div>
            </div>    
        `).join("");

        res.send(html);
    } catch (error) {
        res.send(`<div class="alert alert-danger" role="alert">erro ao criar tarefa</div>`)
    }
})

// deletando uma tarefa
app.delete("/todos/:id", async (req, res) => {

    try {
        
        const tarefa = await Todo.findByPk(req.params.id)

        if(tarefa) {

            await tarefa.destroy()
            res.send(`<div class="alert alert-success" role="alert">Tarefa excluida sucesso</div>`)
        } else {
            res.send(`tarefa nao encontrada`)
        }

    } catch (error) {
        res.send(`erro ao deletar tarefa`)
    }

});

app.patch("/todos/:id", async (req, res) => {

    try {
        
        const tarefa = await Todo.findByPk(req.params.id)

        if(tarefa) {

            tarefa.completa = !tarefa.completa;

            await tarefa.save();

            res.send(`<div class="alert alert-success" role="alert">A tarefa ${tarefa.texto} foi marcada como ${tarefa.completa ? "completa" : "imcompleta"}</div>`)
        } else {
            res.send(`tarefa nao encontrada`)
        }

    } catch (error) {
        res.send(`erro ao deletar tarefa`)
    }

});

app.put("/todos", async (req, res) => {

    const { id,  texto, dificuldade } = req.body;

    if(!texto || !dificuldade) {
        res.send(`<div class="alert alert-danger" role="alert">texto e dificuldade sao obrigatorias</div>`)
        return;
    }


    try {
        
        const tarefa = await Todo.findByPk(id)

        if(tarefa) {

            await tarefa.update({ texto, dificuldade });

            res.send(`<div class="alert alert-success" role="alert">A tarefa ${tarefa.texto} foi atualizada</div>`)
        } else {
            res.send(`<div class="alert alert-danger" role="alert">tarefa nao encontrada</div>`)
        }

    } catch (error) {
        res.send(`erro ao deletar tarefa`)
    }

});


sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`servidor rodando na porta : ${port}`)
    })
})