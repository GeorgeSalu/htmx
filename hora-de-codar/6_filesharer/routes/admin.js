const express = require("express");

const { User } = require("../models");

const router = express.Router();

router.get("/", (req, res) => {

    res.render("layout", { title: "Login", template: "admin" })
});


module.exports = router;