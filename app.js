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
    req.body.blog.body = req.sanitize(req.body.blog.body);
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
    Blog.findById(req.params.id, function (err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE Route
app.put("/blogs/:id", (req, res) => {

    console.log("Request made for the UPDATE Route");
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });


});


//DESTROY Route
app.delete("/blogs/:id", (req, res) => {

    console.log("Request made for the Destroy Route");
    Blog.findByIdAndRemove(req.params.id,  function (err){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

//ALL OTHER ROUTES
app.get("*", (req, res) => {
   res.sendStatus(404);
});

app.listen(port, () => {
    console.log("Server Started");
});



//Might need later
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Vivamus a finibus odio. Cras risus turpis, lobortis id eros a, feugiat ornare felis.
 * Ut egestas odio eget varius imperdiet. Curabitur viverra diam dignissim tempor maximus.
 * Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
 * Cras eu tempus velit, sed fermentum dolor. In quis tempor nisi. Aenean rutrum lectus ut
 * lectus egestas, consectetur convallis lorem efficitur. Donec maximus magna ut pretium finibus.
 * Aliquam semper velit eget posuere congue.
 * Vivamus tempor nec sem eget cursus.
 * Phasellus ultrices mollis purus id ultrices. Nunc ultrices eget odio et iaculis.
 * Donec accumsan justo eu feugiat faucibus. Praesent risus est,
 * finibus vel felis vel, tristique lacinia libero. Vestibulum tempus
 * efficitur nibh, nec tempor eros molestie quis. Sed nec risus at est tristique auctor.
 * Maecenas vitae fermentum nulla. Cras suscipit massa non sagittis accumsan.
 * Cras eleifend sollicitudin feugiat.
 * Sed tincidunt tempus odio, non accumsan nisl mattis a.
 * Integer scelerisque non nibh id tempus.
 * Ut id orci in leo pulvinar condimentum condimentum ac metus.
 * Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
 * Proin pharetra quis metus et facilisis. Mauris mollis ullamcorper nisl vel auctor.
 * Praesent ac elit pretium, blandit nunc quis, vulputate neque. Aliquam convallis,
 * magna et molestie finibus, nisi nibh volutpat nibh, vel interdum magna orci eu metus.
 * Ut pellentesque elementum libero, ut semper quam commodo at.
 * Etiam tempus eros eget metus suscipit ornare.
 * Aliquam enim lorem, mollis in blandit et, dapibus sit amet erat.
 * In facilisis vehicula ullamcorper. In est nisl,
 * fermentum lacinia ex non, blandit cursus massa. Nunc vehicula lorem libero,
 * in luctus massa ultrices eu. Praesent sed erat molestie, tincidunt nisl sed,
 * lobortis augue. Mauris faucibus facilisis ligula, ut ultricies mauris convallis a.
 * Quisque lorem risus, porta eu pellentesque sit amet, tempus volutpat mauris.
 * Aliquam consectetur in ante at sollicitudin. Suspendisse potenti.
 * Sed varius augue et mauris hendrerit, finibus semper purus egestas.
 * Fusce aliquet at eros ut lacinia. In vitae lacus mattis, consequat lorem non,
 * efficitur nulla. Proin luctus mi pulvinar, efficitur enim vel, vulputate est.
 * Proin mauris orci, volutpat ac odio non, volutpat vulputate massa.
 * Duis lacinia tellus ac nulla iaculis facilisis.
 * Nullam lacinia lobortis dignissim. In et nulla diam.
 * Suspendisse quis lorem nulla. Nam at ipsum id diam fermentum auctor.
 * Nunc id rutrum metus. Aliquam erat volutpat.
 * Curabitur dui lacus, laoreet ac mauris id, ultrices commodo quam.
 * Integer feugiat libero velit, at fringilla diam posuere nec.
 * * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Vivamus a finibus odio. Cras risus turpis, lobortis id eros a, feugiat ornare felis.
 * Ut egestas odio eget varius imperdiet. Curabitur viverra diam dignissim tempor maximus.
 * Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
 * Cras eu tempus velit, sed fermentum dolor. In quis tempor nisi. Aenean rutrum lectus ut
 * lectus egestas, consectetur convallis lorem efficitur. Donec maximus magna ut pretium finibus.
 * Aliquam semper velit eget posuere congue.
 * Vivamus tempor nec sem eget cursus.
 * Phasellus ultrices mollis purus id ultrices. Nunc ultrices eget odio et iaculis.
 * Donec accumsan justo eu feugiat faucibus. Praesent risus est,
 * finibus vel felis vel, tristique lacinia libero. Vestibulum tempus
 * efficitur nibh, nec tempor eros molestie quis. Sed nec risus at est tristique auctor.
 * Maecenas vitae fermentum nulla. Cras suscipit massa non sagittis accumsan.
 * Cras eleifend sollicitudin feugiat.
 * Sed tincidunt tempus odio, non accumsan nisl mattis a.
 * Integer scelerisque non nibh id tempus.
 * Ut id orci in leo pulvinar condimentum condimentum ac metus.
 * Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
 * Proin pharetra quis metus et facilisis. Mauris mollis ullamcorper nisl vel auctor.
 * Praesent ac elit pretium, blandit nunc quis, vulputate neque. Aliquam convallis,
 * magna et molestie finibus, nisi nibh volutpat nibh, vel interdum magna orci eu metus.
 * Ut pellentesque elementum libero, ut semper quam commodo at.
 * Etiam tempus eros eget metus suscipit ornare.
 * Aliquam enim lorem, mollis in blandit et, dapibus sit amet erat.
 * In facilisis vehicula ullamcorper. In est nisl,
 * fermentum lacinia ex non, blandit cursus massa. Nunc vehicula lorem libero,
 * in luctus massa ultrices eu. Praesent sed erat molestie, tincidunt nisl sed,
 * lobortis augue. Mauris faucibus facilisis ligula, ut ultricies mauris convallis a.
 * Quisque lorem risus, porta eu pellentesque sit amet, tempus volutpat mauris.
 * Aliquam consectetur in ante at sollicitudin. Suspendisse potenti.
 * Sed varius augue et mauris hendrerit, finibus semper purus egestas.
 * Fusce aliquet at eros ut lacinia. In vitae lacus mattis, consequat lorem non,
 * efficitur nulla. Proin luctus mi pulvinar, efficitur enim vel, vulputate est.
 * Proin mauris orci, volutpat ac odio non, volutpat vulputate massa.
 * Duis lacinia tellus ac nulla iaculis facilisis.
 * Nullam lacinia lobortis dignissim. In et nulla diam.
 * Suspendisse quis lorem nulla. Nam at ipsum id diam fermentum auctor.
 * Nunc id rutrum metus. Aliquam erat volutpat.
 * Curabitur dui lacus, laoreet ac mauris id, ultrices commodo quam.
 * Integer feugiat libero velit, at fringilla diam posuere nec.
 */