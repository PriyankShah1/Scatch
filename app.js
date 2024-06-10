const express = require ('express');
const bcrypt = require('bcrypt');
const cookieParser = require( 'cookie-parser');
const path = require("path");
const jwt = require ('jsonwebtoken');
const app = express();
require('dotenv').config();
const flash= require('connect-flash');
const expressSession= require("express-session");


const db = require("./config/mongoose-connection");
const ownersRouter= require("./routes/ownersRouter");
const usersRouter= require("./routes/usersRouter");
const productsRouter= require("./routes/productsRouter");
const indexRouter= require("./routes/index");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))

app.use(flash());



app.use("/", indexRouter);
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

