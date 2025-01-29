// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities"); // Requiring the utilities module
const Util = require("../utilities");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

//Build Inventory View
router.get(
  "/detail/:inventoryId",
  //util.checkJWToken,
  utilities.handleErrors(invController.buildByInventoryId)
);



module.exports = router;
