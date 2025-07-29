const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()
const port = 3333;

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.set("view engine","ejs")

app.get("/teste", (req, res) => {
    res.send("ok")
})

app.get("/", (req, res) => {
    res.render("layout", {title: "devlinks - meus links", template: "index"})
})

app.listen(port, () => {
    console.log(`servidor rodando : http://localhost:${port}`)
})