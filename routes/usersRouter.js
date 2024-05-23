const express = require("express");

const router = express.Router();

router.get("/" , function(req, res){
    res.send("  User route working");
});


module.exports = router;