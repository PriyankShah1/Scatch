const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Working");
});

const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server is listening on port", PORT);
    }
});
