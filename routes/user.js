const express = require("express");
const {handelUserSignup, handelUserLogin, handelUserLogout} = require("../controller/user");
const router = express.Router();


router.post("/signup", handelUserSignup);
router.post("/login", handelUserLogin);
router.post("/logout", handelUserLogout);


module.exports = router;
