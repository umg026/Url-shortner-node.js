const express = require("express");
const URL = require("../model/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();


router.get("/",restrictTo(["basic"]),async (req, res) => {
    // if(!req.user) return res.redirect("/login")
    const allUrl = await URL.find({ createdBy : req.user._id})
    res.render("home", {
        urls: allUrl
    })
})

router.get("/signup", (req,res)=>{
  return res.render("signup")
})

router.get("/login", (req,res)=>{
    return res.render("login")
  })

module.exports = router