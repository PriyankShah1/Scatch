const express = require("express");
const router = express.Router();
const isLoggedIn= require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
   let error = req.flash("error");
   res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
   try {
       let products = await productModel.find();
       res.render("shop", { products });
   } catch (err) {
       console.error("Error fetching products:", err);
       req.flash("error", "Something went wrong while fetching products.");
       res.redirect("/");
   }
});

module.exports = router;
