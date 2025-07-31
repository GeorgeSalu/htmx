const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require("jsonwebtoken")

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("layout", { title: "Login - devlinks", template: "login" })
})

router.get("/register", (req, res) => {
    res.render("layout", { title: "Pagina novo usuario - devlinks", template: "register" })
})

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        return res.status(400).send("Preencha todos os campos")
    }

    const hash = await bcrypt.hash(password, 10)

    try {

        const user = await User.create({
            name,
            email,
            password: hash
        })

        console.log(user);

        res.send("user criado")
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("erro ao registrar usuario")
    }

})

module.exports = router