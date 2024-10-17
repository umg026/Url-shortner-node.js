const express = require("express");
const {handelUserSignup, handelUserLogin} = require("../controller/user");
const router = express.Router();


router.post("/signup", handelUserSignup);
router.post("/login", handelUserLogin);




module.exports = router;
