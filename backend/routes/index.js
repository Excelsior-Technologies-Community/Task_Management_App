const express = require('express')
const router = express.Router()
router.use('/boards', require('./boards'))
module.exports = router
