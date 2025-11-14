const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require("jsonwebtoken")

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("layout", { title: "Login - DevLinks", template: "login" })
})

router.get("/register", (req, res) => {
    res.render("layout", { title: "Pagina novo usuario - DevLinks", template: "register" })
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

        // assinar e gerar o token jwt
        const payload = { id: user.id, username: user.name }
        const token = jwt.sign(payload, "102030", {expiresIn: "30d"})
        console.log(token);

        req.userId = user.id

        // criar um cookie
        const expirationData = new Date();
        expirationData.setDate(expirationData.getDate() + 30);
        res.cookie("auth_token", token, { expires: expirationData })
        
        // header htmx redirecionamento
        res.setHeader("HX-Redirect", "/dashboard")

        res.send("Usuário criado com sucesso")

    } catch (error) {
        console.log(error)
        return res.status(400).send("Erro ao registrar usuário!")
    }

})

module.exports = router