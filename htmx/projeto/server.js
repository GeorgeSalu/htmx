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

app.get("/dados", (req, res) => {

    setTimeout(() => {
        res.send("dados atualizando com sucesso...")
    }, 5000)

})

app.get("/dados-user", (req, res) => {

    const users = [
        { id: 1, name: "matheus", email: "matheus@gmail.com" },
        { id: 2, name: "ana", email: "ana@gmail.com" },
        { id: 3, name: "jose", email: "jose@gmail.com" },
        { id: 4, name: "henrique", email: "henrique@gmail.com" }
    ]

    res.json(users)
})

app.get("/teste", (req, res) => {

    res.status(400).send("Erro ao buscar dados do servidor")
})

app.get("/detalhes", (req, res) => {

    console.log("query: ", req.query)

    console.log("headers: ", req.headers)

    res.send("rota detalhes chamada")
})

app.post("/users", (req, res) => {
    console.log(req.body)

    const nome = req.body.nome;
    const cargo = req.body.cargo;
    const idade = req.body.idade;

    res.send(`<h2>O usuario ${nome} tem o cargo: ${cargo} e tem a idade ${idade} </h2>`)
})

app.listen(port, () => {
    console.log(`backend rodando : http://localhost:${port}`)
})