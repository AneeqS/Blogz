//Variables
var express             = require("express"),
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


//SCHEMA
var blogSchema = new mongoose.Schema({

    name: String,
    image: String,
    content: String,
    created: {type: Date, default: Date.now()}
});

//Model
var Blog = mongoose.Model("Blog", blogSchema);

//ROOT(Home) Route
app.get("/", (req, res) => {
   console.log("Request made for the ROOT Route");
   console.log(Date.now());
});

//INDEX ROUTE
app.get("/blogs", (req, res) => {
   console.log("Request made for the INDEX Route");
});

//NEW Route
app.get("/blogs/new", (req, res) => {
    console.log("Request made for the NEW Route");
});

//CREATE Route
app.post("/blogs", (req, res) => {
    console.log("Request made for the CREATE Route");
});

//SHOW Route
app.get("/blogs/:id", (req, res) => {
    console.log("Request made for the SHOW Route");
});

//EDIT Route
app.get("/blogs/:id/edit", (req, res) => {
    console.log("Request made for the EDIT Route");
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