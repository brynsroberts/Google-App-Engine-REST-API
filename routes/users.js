const express = require("express");
const { getUsers, getUser, getTokenInfo } = require("../controllers/users");
const { getAllowed } = require("../controllers/validation/routes");
const router = express.Router();

// accepted routes - "/"
router.get("/", getUsers);

// error handler - "/"
router.post("/", getAllowed);
router.put("/", getAllowed);
router.patch("/", getAllowed);
router.delete("/", getAllowed);

// accepted routes - "/:user_id"
router.get("/:user_id", getUser);

// error handler - "/:user_id"
router.post("/:user_id", getAllowed);
router.put("/:user_id", getAllowed);
router.patch("/:user_id", getAllowed);
router.delete("/:user_id", getAllowed);

// route to get user JWT and id
router.get("/token/info", getTokenInfo);

module.exports = router;
