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

module.exports = router;