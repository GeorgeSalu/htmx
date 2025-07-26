import express from 'express'
import cors from 'cors'

const app = express()
const port = 3333;

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(port, () => {
    console.log(`server online na url http://localhost:${port}`)
})