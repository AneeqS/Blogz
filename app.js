//Variables
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    ejs = require("ejs"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

//APP CONFIGURATIONS
mongoose.connect("mongodb://localhost:27017/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
