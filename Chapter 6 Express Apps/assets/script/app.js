const express = require("express");
const { resolve } = require("path");
const path = require("path");        
//Initiate the app
const app = express();

app.listen(3000);

app.get("/", (req, res) => {
    // res.send('<p>Home Page</p>');
    console.log(req.url);
    res.sendFile("home.html", {root: "../../"});
});


app.get("/about", (req, res) => {
    // res.send("<p>About Page</p>");
    console.log(req.url)
    res.sendFile("about.html", {root: "../../"});
});

app.get("/about-us", (req, res) => {
    res.redirect("/about");
});

app.use((req, res) => {
    res.status(404).sendFile("404.html", {root: "../../"});
});


