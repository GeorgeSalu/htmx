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
    res.send("<div><h2 style='color: red;'>ok funcionando</h2></div>")
})


app.get("/users", async (req, res) => {
    
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()

    let htmlResponse = data.map((user) => `<div>${user.name} - ${user.email}<div/>`).join("")
    

    res.send(htmlResponse)
})

app.listen(port, () => {
    console.log(`backend rodando : http://localhost:${port}`)
})