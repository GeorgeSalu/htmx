const express = require("express");
const authenticationToken = require("../middleware/authUser")
const { Links } = require("../models");
const { where } = require("sequelize");

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

        res.send("link cadastrado com sucesso")

    }catch(err) {
        return res.status(400).send("Erro ao cadastrar o link")
    }

})

router.get("/dashboard/links", authenticationToken, async (req, res) => {
    const userId = req.userId

    if(!userId) {
        return res.status(400).send("Erro ao buscar os links")
    }


    try{

        const links = await Links.findAll({ where: { userId } })

        let html = links.map((link) => `
            <div class='bg-white flex items-center justify-between w-full rounded p-2 mt-4'>
                <p class='text-lg text-black w-full'>${link.name}</p>
            </div>
        `).join("")
        

        return res.send(html)
    }catch(err) {
        console.log(err)
        return res.status(400).send("falha ao buscar os links")
    }
})

module.exports = router;