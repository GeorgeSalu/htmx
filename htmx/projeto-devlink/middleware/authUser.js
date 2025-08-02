const jwt = require("jsonwebtoken");

function autheticationToken(req, res, next) {
    const token = req.cookies?.auth_token

    console.log(token)
}

module.exports = autheticationToken