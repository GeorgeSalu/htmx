const express = require("express");
const { Model } = require("sequelize");

const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.render("layout", { title: "devLinks - Painel administrativo", template: 'dashboard' })
})

module.exports = router;