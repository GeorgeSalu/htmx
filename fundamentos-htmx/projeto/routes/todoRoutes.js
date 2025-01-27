const express = require("express");
const router = express.Router();

const Todo = require("../model/Todo");
const { Sequelize } = require("sequelize");

router.post("/todos", async (req, res) => {
    const { title } = req.body;

    const newTodo = await Todo.create({ title });

    res.send("Todo criado");
})