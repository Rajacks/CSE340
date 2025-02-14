const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require('../utilities/account-validation');

//Log in View activity 4
router.get('/login', utilities.handleErrors(accountController.buildLogin))
//Registration view activity 4
router.get("/register", utilities.handleErrors(accountController.buildRegister))
//Registration process activity 4
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    
    utilities.handleErrors(accountController.registerAccount)
  )
  router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )

module.exports = router;