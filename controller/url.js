const shortid = require('shortid');
const URL = require("../model/url")

async function handelGenrateShortUrl(req,res) {
    // get the data via request 
    const body = req.body

    if(!body.url) return res.status(400).json({ msg : "its bad request"})

    const shortID = shortid();

    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : [],
        createdBy : req.user._id
    });
    return res.render("home", {
        id : shortID
    });
}

async function handelGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    console.log("analutics id",shortId)
    const result = await URL.findOne({shortId})

    return res.json({visitHistory : result.visitHistory?.length, historyData : result.visitHistory})
}

// export this functions
module.exports = {
    handelGenrateShortUrl,
    handelGetAnalytics
}