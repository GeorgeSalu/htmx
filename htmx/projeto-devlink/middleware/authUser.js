const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
    const token = req.cookies?.auth_token

    if (token === null || !token) {
        res.setHeader("HX-Redirect", "/")
        return res.redirect("/")
    }

    const secretOrPublicKey = "102030"
    jwt.verify(token, secretOrPublicKey, (err, user) => {
        if(err) {
            res.setHeader("Set-Cookie","auth_token=; Path=/; Expires=0")
            res.setHeader("HX-Redirect", "/")
            return res.redirect("/")
        }

        req.userId = user.id
        next()
    })

}

module.exports = authenticationToken