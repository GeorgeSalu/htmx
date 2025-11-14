const jwt = require("jsonwebtoken");

function autheticationToken(req, res, next) {
    const token = req.cookies?.auth_token

    if (token === null || !token) {
        res.setHeader("HX-Redirect", "/")
        return res.redirect("/")
    }

    const secretTokenJwt = "102030"
    jwt.verify(token, secretTokenJwt, (err, user) => {
        if(err) {
            res.setHeader("Set-Cookie","auth_token=; Path=/; Expires=0")
            res.setHeader("HX-Redirect", "/")
            return res.redirect("/")
        }

        req.userId = user.id
        next()
    })

}

module.exports = autheticationToken