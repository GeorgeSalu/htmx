const express = require("express");
const authenticationToken = require("../middleware/authUser")

const router = express.Router();

router.get("/dashboard", authenticationToken, (req, res) => {
    res.render("layout", { title: "DevLinks - Painel Administrativo", template: 'dashboard' })
})

router.post("/create-link", authenticationToken,  (req, res) => {
    const { name, url } = req.body
    const userId = req.userId

    console.log(name, url)
    console.log(userId)

    res.send("ok")
})

module.exports = router;