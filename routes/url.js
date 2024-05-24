const express = require("express")
const router = express.Router()
const { handleGenerateNewShortURL, handleGetAnalytics, handleRedirectUrl } = require("../controllers/url")

router.post("/create-url", handleGenerateNewShortURL)
router.get("/:shortId", handleRedirectUrl)
router.get("/get-analytics/:shortId", handleGetAnalytics)

module.exports = router