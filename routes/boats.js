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

router.get("/", getBoats);
router.get("/:boat_id", getBoat);
router.put("/:boat_id", putBoat);
router.put("/:boat_id/loads/:load_id", assignLoadToBoat);
router.patch("/:boat_id", patchBoat);
router.post("/", postBoat);
router.delete("/:boat_id", deleteBoat);
router.delete("/:boat_id/loads/:load_id", removeLoadFromBoat);

module.exports = router;
