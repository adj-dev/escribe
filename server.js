require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
let passport = require("passport");

// var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

let session = require("express-session")({
  secret: "ctiosckzhgkyntvitviaw4",
  resave: false,
  saveUninitialized: false
});
passport.use(require("./auth_strategies/local"));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findById(email).then(user => {
    done(null, user);
  });
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(session);
//initialize Passport and let Express know about it
app.use(passport.initialize());
// Set up sessions
app.use(passport.session());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.use(require("./routes/authRoutes")(passport));

app.listen(PORT, function() {
  console.log("Listening on port %s.", PORT);
});
