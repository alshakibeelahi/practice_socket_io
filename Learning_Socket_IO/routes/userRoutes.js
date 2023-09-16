const express = require('express')
const router = express.Router()

const {createUser, getUser, updateUser, getUserById, deleteUser} = require('../controllers/userController')

router.post('/adduser', createUser)
router.get('/getusers',getUser)
router.get('/getuser/:id', getUserById)
router.put('/updateuser/:id', updateUser)
router.delete('/deleteuser/:id', deleteUser)

module.exports = router