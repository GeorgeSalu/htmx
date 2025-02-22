const express = require("express");

const { User } = require("../models");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {

    res.render("layout", { title: "Login", template: "admin" })
});

router.get("/all-files", isAuthenticated, (req, res) => {

    res.render("layout", { title: "Biblioteca de arquivos", template: "allfiles", userId: req.session.userId, files: [] })
})


module.exports = router;