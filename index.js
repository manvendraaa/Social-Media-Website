const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("<h1>this is home page</h1>");
});

app.listen(port, (err) => {
  if (err) console.log(`error in running the server ${err}`);
  console.log(`server running on port: ${port}`);
});
