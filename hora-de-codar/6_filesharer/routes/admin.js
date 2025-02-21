const express = require("express");

const { User } = require("../models");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {

    res.render("layout", { title: "Login", template: "admin" })
});


module.exports = router;