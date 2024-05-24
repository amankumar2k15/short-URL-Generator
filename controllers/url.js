const URL = require("../models/url")

async function handleGenerateNewShortURL(req, res) {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: "URL is missing" })
    const { nanoid } = await import('nanoid');
    const shortID = nanoid(10)

    // await new URL({
    // or
    await URL.create({
        shortId: shortID,
        redirectURL: url,
        visitHistory: []
    })

    // return res.json({ id: shortID })
    return res.render("home", {
        id: shortID
    })
}

// Converted shortId to URL and add timestamp when when i am entering into website by using URL       => http:localhost:8000/generatedID
//Redirect the user to the original URL
async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    )
    // console.log("entry=>", entry)
    res.redirect(entry.redirectURL)
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })

    return res.status(201).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectUrl,
    handleGetAnalytics
}