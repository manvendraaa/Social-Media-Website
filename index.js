const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser')
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

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

// use express router
app.use("/", require("./routes/index"));

// setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, (err) => {
  if (err) console.log(`error in running the server ${err}`);
  console.log(`server running on port: ${port}`);
});
