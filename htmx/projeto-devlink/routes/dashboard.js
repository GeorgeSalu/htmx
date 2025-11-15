const express = require("express");
const authenticationToken = require("../middleware/authUser")

const router = express.Router();

router.get("/dashboard", authenticationToken, (req, res) => {
    res.render("layout", { title: "DevLinks - Painel Administrativo", template: 'dashboard' })
})

module.exports = router;