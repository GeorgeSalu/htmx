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

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`server online na url http://localhost:${port}`)
    })
})