if(process.env.NODE_ENV != "production"){

  require('dotenv').config();
}


const express = require("express");
const app=express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const path = require("path");
const { assert } = require("console");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("./schema.js");
const reviews = require("./models/reviews.js");
const listings = require("./routes/listing.js");
const Reviews = require("./routes/reviews.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const user = require("./routes/users.js");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


const dbUrl = process.env.ATLASDB_URL;

main().then((res)=>{
    console.log("conected to dbs");
})
.catch(err => console.log(err));

async function main() {

   await mongoose.connect(dbUrl);


}






app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create({ 
  mongoUrl: dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24 * 3600,
 
});

store.on("ERROR in MONGO SESSION STORE", err=>{
 console.log(err);
});

app.use(session({
  store,
  secret: process.env.SECRET, // Change this to a random string
  resave: false,
  saveUninitialized: false
}));



// Set up connect-flash middleware
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.currUser = req.user;

  next();
});





app.use("/listing", listings);
app.use("/listing/:id/reviews", Reviews);
app.use("/", user);





app.all("*", (req, res, next)=>{

  next(new ExpressError(404, "this page is not available"));

});

app.use((err, req, res, next)=>{
  let {status = 500, message = "somthing went wrong!"}= err;
res.render("error.ejs", {message, err});
//res.status(status).send(message);
});


app.listen(8080, ()=>{
    console.log("listening to port 8080");
});