const express = require('express')
const {handleGenerateNewUrl, handleAnalytics} = require('../controllers/url')
const router = express.Router()

router.post('/',handleGenerateNewUrl)
router.get('/analytics/:shortId', handleAnalytics)


module.exports = router