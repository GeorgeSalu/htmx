const express = require("express")

const app = express()
const PORT = 3000;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log("servidor executando")
})