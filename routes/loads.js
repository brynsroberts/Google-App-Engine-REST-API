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
const {
  getPostAllowed,
  getPutPatchDeleteAllowed,
} = require("../controllers/validation/routes");

router.get("/", getLoads);
router.post("/", postLoad);
router.put("/", getPostAllowed);
router.patch("/", getPostAllowed);
router.delete("/", getPostAllowed);
router.get("/:load_id", getLoad);
router.put("/:load_id", putLoad);
router.patch("/:load_id", patchLoad);
router.delete("/:load_id", deleteLoad);
router.post("/:load_id", getPutPatchDeleteAllowed);

module.exports = router;
