require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
let passport = require("passport");

var db = require("./models");

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
  let condititon = {
    where: { email: email }
  };
  db.User.findOne(condititon).then(user => {
    done(null, user);
  });
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());
// app.use(require("morgan")("combined"));

app.use(session);
//initialize Passport and let Express know about it
app.use(passport.initialize());
// Set up sessions
app.use(passport.session());

// Handlebars
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routes
//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.use(require("./routes/authRoutes")(passport));
app.use(require("./routes/protectedRoutes"));

app.listen(PORT, function() {
  console.log("Listening on port %s.", PORT);
});
