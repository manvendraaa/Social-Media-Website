const express = require("express");
const app = express();
const port = 8000;
//for the passport js to encrypt the keys express session is used
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser')
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const mongoStore = require('connect-mongo');


//for reading the post requests
app.use(express.urlencoded({extended: true}));

// use cookie parser
app.use(cookieParser());


//setting up static files folder
app.use(express.static("./assets"));

//for individual pages styling
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// specifying that we need express layouts for the layout.ejs
app.use(expressLayouts);


// setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// using the express session 
// using mongostore to store session in database for persistent storage
app.use(session({
  name: 'social media',
  //this is the encryption key
  secret: 'encryptionkey',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge: (1000*60*100)
  },
  store: mongoStore.create({
    mongoUrl: 'mongodb://localhost/socialmedia_development'
  })
}));
// tell to use passport
app.use(passport.initialize());
app.use(passport.session());

// for setting the authenticated user for the routes views
app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes/index"));


app.listen(port, (err) => {
  if (err) console.log(`error in running the server ${err}`);
  console.log(`server running on port: ${port}`);
});
