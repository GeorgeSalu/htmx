const express = require("express");
const authenticationToken = require("../middleware/authUser")

const router = express.Router();

router.get("/dashboard", authenticationToken, (req, res) => {
    res.render("layout", { title: "DevLinks - Painel administrativo", template: 'dashboard' })
})

module.exports = router;