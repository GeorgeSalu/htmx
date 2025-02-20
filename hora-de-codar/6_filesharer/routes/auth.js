const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

router.get("/login", (req, res) => {

    res.render("layout", { title: "Login", template: "login" })
});

router.get("/register", (req, res) => {

    res.render("layout", { title: "Registrar", template: "register" })
});

router.post("/register", async (req, res) => {

    const { nome, senha, email } = req.body;

    const hashSenha = await bcrypt.hash(senha, 10);

    try {
        
        const newUser = await User.create({ nome, email, senha: hashSenha });


        req.session.userId = newUser.id;

        res.setHeader("HX-Redirect", "/admin");

        res.send("Usuario registrado")

    } catch (error) {
        res.send("erro ao registrar usuario");
    }

});

router.post("/login", async (req, res) => {

    const { nome, email } = req.body;

    try {
        
        const user = await User.findOne({ where: { email } });

        if(user && (await bcrypt.compare(senha, user.senha))) {

            req.session.userId = user.id;

            res.setHeader("HX-Redirect", "/admin");

            res.send("Usuario logado");

        } else {
            res.send("Falha no login: credenciais invalidas");
        }

    } catch (error) {
        res.send("erro ao logar usuario");
    }

});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.setHeader("HX-Redirect", "/");

        res.send("logout efetuado");
    })
})

module.exports = router;