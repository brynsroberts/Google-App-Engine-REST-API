const express = require("express");
const { getUsers, getUser, getTokenInfo } = require("../controllers/users");
const { getAllowed } = require("../controllers/validation/routes");
const router = express.Router();

router.get("/", getUsers);
router.get("/:user_id", getUser);
router.get("/token/info", getTokenInfo);
router.post("/", getAllowed);
router.put("/", getAllowed);
router.patch("/", getAllowed);
router.delete("/", getAllowed);
router.post("/:user_id", getAllowed);
router.put("/:user_id", getAllowed);
router.patch("/:user_id", getAllowed);
router.delete("/:user_id", getAllowed);

module.exports = router;
