const express = require("express");

// Adding Morgan
const morgan = require("morgan");

//Initiate the app
const app = express();
app.set('view engine', 'ejs');

//Listen to requests on Port: 3000, Localhost
app.listen(3000);

// app.use((req, res, next) => {
//     console.log("New request made:");
//     console.log("Host: ", req.hostname);
//     console.log("Path: ", req.path);
//     console.log("Method: ", req.method);
//     next();
// });

app.use(morgan('dev'));

console.log("Another variant of morgan: ");

app.use(morgan("tiny"));

//Middleware for adding stating files
app.use(express.static("app assets/style/"));

//Handler functions to invoke on different get request urls
app.get("/", (req, res) => {
    const blogs = [
        {title: "Blog number one", snippet:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
        {title: "Blog number two", snippet:"Lorem ipsum dolor sit amet consectetur adipisicing elit."},
        {title: "Blog number three", snippet:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
    ];
    res.render("index", {title: "Home", blogs});
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

app.get("/blogs/create", (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})
app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});
