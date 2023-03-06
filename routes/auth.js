const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

// http://localhost:5000/api/auth/login
router.post('/login', controller.login)

// http://localhost:5000/api/auth/registration
router.post('/registration', controller.registration)

module.exports = router