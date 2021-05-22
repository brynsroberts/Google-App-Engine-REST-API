const express = require("express");
const router = express.Router();
const {
  getLoads,
  getLoad,
  postLoad,
  deleteLoad,
} = require("../controllers/loads");

router.get("/", getLoads);
router.get("/:load_id", getLoad);
router.post("/", postLoad);
router.delete("/:load_id", deleteLoad);

module.exports = router;
