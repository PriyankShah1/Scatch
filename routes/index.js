// const express = require("express");
// const router = express.Router();
// const isLoggedIn= require("../middlewares/isLoggedIn");
// const productModel = require("../models/product-model");
// const userModel = require("../models/user-model");

// router.get("/", function (req, res) {
//    let error = req.flash("error");
//    res.render("index", { error ,loggedin: false });
// });

// router.get("/cart" , isLoggedIn, async function(req, res){
//     let user= await userModel.findOne({email : req.user.email}).populate("cart");
//     res.render("cart", {user});
// })

// router.get("/addtocart/:productid", isLoggedIn, async function(req,res){
//     let user= await userModel.findOne({email: req.user.email});
//     user.cart.push(req.params.productid);
//     await user.save();
//     req.flash("success", "Added to cart");
//     res.redirect("/shop");

// })


// router.get("/shop", isLoggedIn, async function (req, res) {
//    try {
//        let products = await productModel.find();
//        let success= req.flash("success");
//        res.render("shop", { products , success});
//    } catch (err) {
//        console.error("Error fetching products:", err);
//        req.flash("error", "Something went wrong while fetching products.");
//        res.redirect("/");
//    }
// });



// router.get("/cart", isLoggedIn, async function (req, res) {
//     try {
//         res.render("cart");
//     } catch (err) {
//         console.error("Error fetching products:", err);
//         req.flash("error", "Something went wrong while fetching products.");
//         res.redirect("/");
//     }
//  });

// module.exports = router;



const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

router.get("/cart", isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate('cart.product');
        res.render("cart", { user });
    } catch (err) {
        console.error("Error fetching cart:", err);
        req.flash("error", "Something went wrong while fetching cart.");
        res.redirect("/");
    }
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        const product = await productModel.findById(req.params.productid);
        
        if (!product) {
            req.flash("error", "Product not found.");
            return res.redirect("/shop");
        }

        user.cart.push({ product: req.params.productid, quantity: 1 });
        await user.save();
        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (err) {
        console.error("Error adding to cart:", err);
        req.flash("error", "Something went wrong while adding to cart.");
        res.redirect("/shop");
    }
});

router.get("/shop", isLoggedIn, async function (req, res) {
    try {
        let products = await productModel.find();
        let success = req.flash("success");
        res.render("shop", { products, success });
    } catch (err) {
        console.error("Error fetching products:", err);
        req.flash("error", "Something went wrong while fetching products.");
        res.redirect("/");
    }
});




// index.js or your router file
router.get("/updatequantity/:productid", isLoggedIn, async function (req, res) {
    const { productid } = req.params;
    const { action } = req.query;

    try {
        let user = await userModel.findOne({ email: req.user.email });
        let cartItem = user.cart.find(item => item.product.toString() === productid.toString());

        if (!cartItem) {
            req.flash("error", "Product not found in cart.");
            return res.redirect("/cart");
        }

        if (action === 'increase') {
            cartItem.quantity += 1;
        } else if (action === 'decrease') {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                // Optionally, you can remove the item from cart if quantity is 1
                user.cart = user.cart.filter(item => item.product.toString() !== productid.toString());
            }
        }

        await user.save();
        req.flash("success", "Quantity updated successfully.");
        res.redirect("/cart");
    } catch (err) {
        console.error("Error updating quantity:", err);
        req.flash("error", "Something went wrong while updating quantity.");
        res.redirect("/cart");
    }
});

module.exports = router;
