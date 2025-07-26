import express from 'express'
import cors from 'cors'
import { Sequelize, DataTypes } from 'sequelize'

const app = express()
const port = 3333;

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite",
})

const Customer = sequelize.define("Customer", {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cargo: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
})

app.get("/teste", (req, res) => {
    res.send("api funcionando")
})

app.post("/clientes", async (req, res) => {

    const { nome, email, cargo, status } = req.body

    if(!nome || !email) {
        return res.send(`<div><p>Preencha todos os campos</p></div>`)
    }

    try {

        const funcionario = await Customer.create({
            nome,
            email,
            cargo,
            status: status ? true : false
        })

        return res.send(`<div><p>Funcionario cadastrado com sucesso</p></div>`)

    }catch(err) {
        console.log(err)
        return res.send(`<div><p>Erro ao registrar esse usuario</p></div>`)
    }

    res.send("funcionando")
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`server online na url http://localhost:${port}`)
    })
})