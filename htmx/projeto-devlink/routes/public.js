const express = require('express')
const { Links } = require("../models");
const { Template } = require('ejs');

const router = express.Router();

router.get("/links/:username", (req, res) => {
    const username = req.params.username

    res.render("layout", { title: "Maus Links - DevLinks", username: username ,template: "links" })
})

router.get("/links", async (req, res) => {
    
    try {

        const links = await Links.findAll();

        let html = links.map((link) => `
            <a class='bg-white flex items-center justify-center w-full p-2 mt-4 rounded'
                href="${link.url}" target='_blank'>
                <p class='text-lg text-black w-full text-center'>${link.name}</p>
            </a>
        `).join("")

        return res.send(html)

    }catch(err) {
        console.log(err)
        res.status(400).send("Erro ao buscar os links cadastrados na aplicação")
    }
    
})

module.exports = router