const jwt = require("jsonwebtoken");

function autheticationToken(req, res, next) {
    const token = req.cookies?.auth_token

    if (token === null || !token) {
        res.setHeader("HX-Redirect", "/")
        return res.redirect("/")
    }

    console.log(token)

    next()
}

module.exports = autheticationToken