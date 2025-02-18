const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory by specific view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId;
  let nav = await utilities.getNav();
  res.locals.inv_id = inventory_id;
  const result = await invModel.getInventoryByInventoryId(inventory_id);
  const data = result[0];
  const details = await utilities.buildItemInventoryGrid(data);
  res.render("./inventory/product", {
    title: null,
    nav,
    details,
    errors: null,
  });
};

/* ***************************
  Build Inventorey management view
 * ************************** */
  invCont.createInvManagement = async (req, res, next) => {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList()
    let inventory = await invModel.getInventory()
    res.render('./inventory/management', {
      title: 'Inventory Management',
      nav,
      inventory: inventory,
      classificationList,
    })
  }

invCont.causeError = function (req, res, next) {
  throw new Error("intentional error");
};

module.exports = invCont;
