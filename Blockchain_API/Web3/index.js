const parser = require("body-parser");
const express = require("express");
const rout = require("../Router/router");
const app = express();
const port = process.env.PORT || 2500;
app.use(parser.urlencoded());
app.use("/", rout.routing);

app.listen(port, () => {
  console.log(`Connection sucessfull on ${port}`);
  console.log(`Server started at http://localhost:${port}`);
});


