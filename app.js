const express = require ('express');
const bcrypt = require('bcrypt');
const cookieParser = require( 'cookie-parser');
const path = require("path");
const jwt = require ('jsonwebtoken');
const app = express();

// const db = require("./config/mongoose-connnection");
const ownersRouter= require("./routes/ownersRouter");
const usersRouter= require("./routes/usersRouter");
const productsRouter= require("./routes/productsRouter");
app.set("view engine", "ejs");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/owners" , ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server is listening on port", PORT);
    }
});
