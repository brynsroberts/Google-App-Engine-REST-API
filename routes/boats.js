const express = require("express");
const router = express.Router();
const {
  getBoat,
  getBoats,
  postBoat,
  deleteBoat,
  assignLoadToBoat,
  removeLoadFromBoat,
  getAllLoadsForBoat,
} = require("../controllers/boats");

router.get("/", getBoats);
router.get("/:id", getBoat);
router.put("/:boat_id/loads/:load_id", assignLoadToBoat);
router.post("/", postBoat);
router.delete("/:id", deleteBoat);
router.delete("/:boat_id/loads/:load_id", removeLoadFromBoat);

module.exports = router;
