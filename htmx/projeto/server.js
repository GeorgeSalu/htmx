import express from 'express'
import cors from 'cors'

const app = express()
const port = 3333;

app.use(cors());

app.use(express.static("public"))

app.use(express.urlencoded({ urlencoded: true }))

app.use(express.json())


app.get("/primeira-rota", (req, res) => {
    console.log("requisicao foi chamada")

    res.send("<img src='https://sujeitoprogramador.com/steve.png' width='100' height='100' />")
})


app.get("/users", async (req, res) => {

    const limit = +req.query.limit

    setTimeout( async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
        const data = await response.json()

        let htmlResponse = data.map((user) => `<div>${user.name} - ${user.email}<div/>`).join("")
        

        res.send(htmlResponse)
    }, 2500)

})

app.get("/info", (req, res) => {
    const nome = req.query.nome
    const cargo = req.query.cargo
    console.log(`bem vindo ${nome} com o cargo ${cargo}`)

    res.send("bem vindo fulano")
})

app.listen(port, () => {
    console.log(`backend rodando : http://localhost:${port}`)
})