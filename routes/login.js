const express = require("express");

const { oauthRedirect } = require("../controllers/login");

const router = express.Router();

router.get("/oauth", oauthRedirect);

module.exports = router;
