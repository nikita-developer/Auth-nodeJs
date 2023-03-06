const express = require('express')
const router = express.Router()
const controller = require('../controllers/category')
const passport = require('passport')


router.get('/', [ passport.authenticate('jwt', {session: false})], controller.getAll)

module.exports = router