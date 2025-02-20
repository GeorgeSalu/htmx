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

module.exports = router;