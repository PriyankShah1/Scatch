const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("development:mongoose");

const mongoURI = config.get("MONGODB_URI");

console.log("Starting MongoDB connection...");

mongoose
    .connect(`${mongoURI}/scatch`)
    .then(() => {
        debug("Connected to MongoDB...");
    })
    .catch((err) => {
        debug("Failed to connect to MongoDB", err);
    });

module.exports = mongoose.connection;
