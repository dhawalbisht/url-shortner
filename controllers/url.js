const URL = require('../models/url');

async function handleGenerateNewUrl(req, res) {
    const { nanoid } = await import('nanoid');
    const body = req.body;
    
    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,  
        visitHistory: []
    });

    return res.json({ id: shortId });
}

async function handleAnalytics(req,res){
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length, analytics:result.visitHistory})
}


module.exports = { handleGenerateNewUrl, handleAnalytics };
