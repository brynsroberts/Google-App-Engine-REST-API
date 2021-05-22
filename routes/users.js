const express = require("express");
const { getUsers, getUser, getTokenInfo } = require("../controllers/users");
const router = express.Router();

router.get("/", getUsers);
router.get("/:user_id", getUser);
router.get("/token/info", getTokenInfo);

module.exports = router;
