const express = require('express')
const router = express.Router()
const controller = require('../controllers/category')
const passport = require('passport')
const roleMiddleware = require('../middleware/role')


router.get('/', [
    passport.authenticate('jwt', {session: false}),
    roleMiddleware(['user'])
], controller.getAll)

module.exports = router