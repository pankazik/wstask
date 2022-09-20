const express = require("express");
const bramkiController = require("../controllers/bramkiController");

const router = express.Router();

router.get("/", bramkiController.getAllBramki);
router.post("/", bramkiController.addBramka);
router.post("/del/:id/", bramkiController.delBramka);
router.post("/update/:id/", bramkiController.updateBramka);

module.exports = router;
