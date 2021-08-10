const express = require("express");

//Adding blogRoutes
const blogRoutes = require("./routes/blogRoutes");

//Adding Mongoose
const mongoose = require("mongoose");

//Initiate the app
const app = express();

//connect to MongoDB
const dbUrl = "mongodb+srv://user1:test1234@nodepracticeproject.lrmbi.mongodb.net/node-blogging?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {console.log("Connected to DB");app.listen(3000);})
.catch((err) => console.log(err));

app.set('view engine', 'ejs');

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
app.use(express.urlencoded({extended: true}));

//Handler functions to invoke on different get request urls
app.get("/", (req, res) => {
   res.redirect("/blogs")
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

app.use(blogRoutes);

app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});

