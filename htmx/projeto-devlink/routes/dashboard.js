const express = require("express");
const authUser = require("../middleware/authUser")

const router = express.Router();

router.get("/dashboard", (req, res) => {
    res.render("layout", { title: "DevLinks - Painel administrativo", template: 'dashboard' })
})

module.exports = router;