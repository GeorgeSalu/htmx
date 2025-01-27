const express = require("express");
const router = express.Router();

const Todo = require("../model/Todo");
const { Sequelize } = require("sequelize");

const createTodoTemplate = (todo) => `
    <li id="todo-${todo.id}" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo.title}</span>
        <div>
            <form class="d-inline">
                <button>${todo.completed ? "Desmarcar" : "Marcar conclusão"}</button>
            </form>
            <form class="d-inline">
                <button class="btn btn-danger">Excluir</button>
            </form>
        </div>
    </li>
`

router.get("/todos", async(req, res) => {

    const todos = await Todo.findAll();

    const todoItems = todos.map(createTodoTemplate).join("");

    res.send(todoItems)
})

router.post("/todos", async (req, res) => {
    const { title } = req.body;

    const newTodo = await Todo.create({ title });

    res.send("Todo criado");
})

module.exports = router