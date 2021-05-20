const express = require("express");
const router = express.Router();
const { oauthRedirect } = require("../controllers/login");

router.get("/oauth", oauthRedirect);

module.exports = router;
