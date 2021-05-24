const express = require("express");
const router = express.Router();
const {
  getBoat,
  getBoats,
  postBoat,
  deleteBoat,
  assignLoadToBoat,
  removeLoadFromBoat,
  putBoat,
  patchBoat,
} = require("../controllers/boats");
const {
  getPostAllowed,
  getPutPatchDeleteAllowed,
  putDeleteAllowed,
} = require("../controllers/validation/routes");

// accepted routes - "/"
router.get("/", getBoats);
router.post("/", postBoat);

// error handler - "/"
router.put("/", getPostAllowed);
router.patch("/", getPostAllowed);
router.delete("/", getPostAllowed);

// accepted routes - "/:boat_id"
router.get("/:boat_id", getBoat);
router.put("/:boat_id", putBoat);
router.patch("/:boat_id", patchBoat);
router.delete("/:boat_id", deleteBoat);

// error handler - "/:boat_id"
router.post("/:boat_id", getPutPatchDeleteAllowed);

// accepted routes - "/:boat_id/loads/:load_id"
router.put("/:boat_id/loads/:load_id", assignLoadToBoat);
router.delete("/:boat_id/loads/:load_id", removeLoadFromBoat);

// error handler - "/:boat_id/loads/:load_id"
router.get("/:boat_id/loads/:load_id", putDeleteAllowed);
router.post("/:boat_id/loads/:load_id", putDeleteAllowed);
router.patch("/:boat_id/loads/:load_id", putDeleteAllowed);

module.exports = router;
