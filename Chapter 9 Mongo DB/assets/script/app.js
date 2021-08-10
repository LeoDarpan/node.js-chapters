const express = require("express");
// Adding Morgan
//const morgan = require("morgan");

//Adding Mongoose
const mongoose = require("mongoose");

//Adding Blog model
const Blog = require("./models/blog");

//Initiate the app
const app = express();

//connect to MongoDB
const dbUrl = "mongodb+srv://user1:test1234@nodepracticeproject.lrmbi.mongodb.net/node-blogging?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {console.log("Connected to DB");app.listen(3000);})
.catch((err) => console.log(err));

app.set('view engine', 'ejs');

//Listen to requests on Port: 3000, Localhost


// app.use((req, res, next) => {
//     console.log("New request made:");            
//     console.log("Host: ", req.hostname);
//     console.log("Path: ", req.path);
//     console.log("Method: ", req.method);
//     next();
// });

//app.use(morgan('dev'));

//console.log("Another variant of morgan: ");

//app.use(morgan("tiny"));

//Sending data to the blog
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "Another new blog",
        snippet: "About this new blog",
        body: "I hope I remember each and every step in the making as its a complicated long process."
    });
    
    blog.save().then((result) => res.send(result)).catch((err) => console.log(err));
});

app.get("/all-blogs", (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    }).catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
    Blog.findById("610bdc7259df441bc4397fd7").then((result) => {
        res.send(result);
    }).catch((err) => console.log(err));
});

//Middleware for adding static files
app.use(express.static("app assets/style/"));

//Handler functions to invoke on different get request urls
app.get("/", (req, res) => {
   res.redirect("/blogs")
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

//Blog routes
app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: "All blogs", blogs: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
    res.render('create', {title: "Create a new Blog"});
})
app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});
