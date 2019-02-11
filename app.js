//Variables
let express             = require("express"),
    bodyParser          = require("body-parser"),
    ejs                 = require("ejs"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    port                = 3000,
    app                 = express();

//APP CONFIGURATIONS
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//SCHEMA/Model Config
let blogSchema = new mongoose.Schema({

    title: String,
    image: String,
    content: String,
    created: {type: Date, default: Date.now()}
});

let Blog = mongoose.model("Blog", blogSchema);


//RESTful Routes


//ROOT(Home) Route
app.get("/", (req, res) => {

   console.log("Request made for the ROOT Route");
   res.redirect("/blogs");

});

//INDEX ROUTE
app.get("/blogs", (req, res) => {

    console.log("Request made for the INDEX Route");
    Blog.find({}, function (err, blogs){
       if(err){
           console.log(err);
       }else{
           res.render("index", {blogs: blogs});
       }
    });
});

//NEW Route
app.get("/blogs/new", (req, res) => {

    console.log("Request made for the NEW Route");
    res.render("new");
});

//CREATE Route
app.post("/blogs", (req, res) => {

    console.log("Request made for the CREATE Route");
    Blog.create(req.body.blog, function (err, newBlog){
       if(err){
           console.log(err);
           res.render("new");
       }else{
           res.redirect("/blogs");
       }
    });
});

//SHOW Route
app.get("/blogs/:id", (req, res) => {

    console.log("Request made for the SHOW Route");
    Blog.findById(req.params.id, function (err, foundBlog){
       if(err){
           console.log(err);
           res.redirect("/blogs");
       }else{
           res.render("show", {blog: foundBlog});
       }
    });
});
//EDIT Route
app.get("/blogs/:id/edit", (req, res) => {

    console.log("Request made for the EDIT Route");
    res.render("edit");

});

//UPDATE Route
app.put("/blogs/:id", (req, res) => {

    console.log("Request made for the UPDATE Route");
});

/*
//DESTROY Route
app.delete("/blogs/:id" (req, res) => {
    console.log("Request made for the Destroy Route");
});*/

//ALL OTHER ROUTES
app.get("*", (req, res) => {
   res.sendStatus(404);
});

app.listen(port, () => {
    console.log("Server Started");
});