const express = require('express')
const router = express.Router()

const AllReports = require('../controllers/test')

router.route('/').get(AllReports)

module.exports = router