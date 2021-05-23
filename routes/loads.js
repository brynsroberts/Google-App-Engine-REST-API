const express = require("express");
const router = express.Router();
const {
  getLoads,
  getLoad,
  postLoad,
  deleteLoad,
  putLoad,
  patchLoad,
} = require("../controllers/loads");

router.get("/", getLoads);
router.get("/:load_id", getLoad);
router.post("/", postLoad);
router.put("/:load_id", putLoad);
router.patch("/:load_id", patchLoad);
router.delete("/:load_id", deleteLoad);

module.exports = router;
