const express = require('express')
const router = express.Router()

const {login} = require('../controllers/authController')
const {createUser} = require('../controllers/userController')
const {validateSignUpCode} = require('../controllers/userController')

router.post('/login', login)
router.post('/signup',createUser)
router.post('/check-signup-code/:id', validateSignUpCode)

module.exports = router