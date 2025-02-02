const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");

//Log in View activity 4
router.get('/login', utilities.handleErrors(accountController.buildLogin))
//Registration view activity 4
router.get("/register", utilities.handleErrors(accountController.buildRegister))
//Registration process activity 4
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router;