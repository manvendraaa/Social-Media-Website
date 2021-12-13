const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

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
