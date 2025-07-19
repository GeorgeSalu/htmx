import express from 'express'
import cors from 'cors'

const app = express()
const port = 3333;

app.use(cors());

app.use(express.static("public"))

app.use(express.urlencoded({ urlencoded: true }))

app.use(express.json())

app.get("/users", (req, res) => {
    console.log("requisicao foi chamada")
    res.send("<div><h2 style='color: red;'>ok funcionando</h2></div>")
})

app.listen(port, () => {
    console.log(`backend rodando : http://localhost:${port}`)
})