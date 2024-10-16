const express = require('express');
const { 
    handelGenrateShortUrl, 
    handelGetAnalytics
 } = require('../controller/url');
const router = express.Router();

router.post("/", handelGenrateShortUrl);
router.get("/analytics/:shortId", handelGetAnalytics)

module.exports = router;
