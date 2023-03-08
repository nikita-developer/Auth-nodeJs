const jwt = require('jsonwebtoken')
const secret = require('../config/keys')

module.exports = function (roles) {
    return function (req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]

            let hasRole = false

            jwt.verify(token, secret.jwt).roles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            })

            if(!hasRole) {
                return res.status(403).json({message: 'У вас нет доступа'})
            }
            next()
        } catch (e) {
            return res.status(403).json({message: 'На этапе получения доступа что-то пошло не так'})
        }
    }
}