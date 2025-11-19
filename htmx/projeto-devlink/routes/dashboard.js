const express = require("express");
const authenticationToken = require("../middleware/authUser")
const { Links } = require("../models")

const router = express.Router();

router.get("/dashboard", authenticationToken, (req, res) => {
    res.render("layout", { title: "DevLinks - Painel Administrativo", template: 'dashboard' })
})

router.post("/create-link", authenticationToken, async  (req, res) => {
    const { name, url } = req.body
    const userId = req.userId

    try {

        const link = await Links.create({
            name,
            url,
            userId
        })

    }catch(err) {
        return res.status(400).send("Erro ao registrar o link")
    }

    res.send("ok")
})

module.exports = router;