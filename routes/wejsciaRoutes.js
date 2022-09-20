const express = require("express");

const wejsciaController = require("../controllers/wejsciaController");

const router = express.Router();

router.post("/get", wejsciaController.countWejscia);
router.post("/", wejsciaController.addWejscie);
router.post("/del/:id/", wejsciaController.delWejscie);

module.exports = router;
