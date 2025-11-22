const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("layout", { title: "Login - DevLinks", template: "login" })
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).send("Preencha todos os campos!")
    }

    try {

        const user = await User.findOne({ where: {email} })

        if(!user) {
            return res.status(401).send("Senha/Usuario incorretos")
        }
        
        // verifica a senha
        const passwordTest = await bcrypt.compare(password, user.password)

        if(!passwordTest) {
            return res.status(401).send("Senha/Usuario incorretos")
        } 

        // gerar e assinar token
        const payload = { id: user.id, username: user.name }
        const token = jwt.sign(payload, "102030", { expiresIn: "30d" })
        

        req.userId = user.id
        
        // criar um cookie
        const expirationData = new Date();
        expirationData.setDate(expirationData.getDate() + 30);
        res.cookie("auth_token", token, { expires: expirationData })

        res.setHeader("HX-Redirect", "/dashboard")

        return res.send("Usuario cadastrado")
    }catch(err) {
        console.log(err)
        return res.status(401).send("Erro ao efetuar login")
    }
})

router.get("/register", (req, res) => {
    res.render("layout", { title: "Pagina novo usuário - DevLinks", template: "register" })
})

router.post("/register", async (req, res) => {
    const {name, username, email, password} = req.body

    if(!name || !email || !password || !username) {
        return res.status(400).send("Preencha todos os campos!")
    }

    const newUserName = username.trim()

    const findUser = await User.findOne({ where: { username: newUserName } })

    if (findUser) {
        return res.status(400).send("Esse username ja existe!")
    }

    const hash = await bcrypt.hash(password, 10)

    try {

        const user = await User.create({
            name,
            username: newUserName,
            email,
            password: hash
        })

        // assinar e gerar o token jwt
        const payload = { id: user.id, username: user.name }
        const secretOrPublicKey = "102030"
        const token = jwt.sign(payload, secretOrPublicKey, {expiresIn: "30d"})
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

router.get("/logout", (req, res) => {
    res.setHeader("Set-Cookie","auth_token=; Path=/; Expires=0")
    res.setHeader("HX-Redirect", "/")
    res.send("ok")
})

module.exports = router