const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("../models")
const jwt = require("jsonwebtoken")

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("layout", { title: "Pagina novo usuario - devlinks", template: "register" })
})

module.exports = router