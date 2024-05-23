const mongoose = require("mongoose");

mongoose
.connect("")
.then (function(){
    console.log("connected");
})
.catch(function (err) {
    console.log(err);
});


module.exports= mongoose.connection;