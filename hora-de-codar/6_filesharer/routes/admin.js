const express = require("express");
const upload = require("../config/multerConfig");

const { User } = require("../models");
const { File } = require("../models");

const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {

    res.render("layout", { title: "Login", template: "admin" })
});

router.get("/all-files", isAuthenticated, (req, res) => {

    res.render("layout", { title: "Biblioteca de arquivos", template: "allfiles", userId: req.session.userId, files: [] })
});

router.get("/upload", isAuthenticated, upload.single("arquivo") ,(req, res) => {

    const { nome, descricao } = req.body;
    const caminho = req.file.path;
    const userId = req.session.userId;

    if(!nome || !file) {

        res.status(422).send("Preencha todos os campos")
    }

    try {
        
    } catch (error) {
        res.status(500).send("Preencha todos os campos")
    }

});


module.exports = router;