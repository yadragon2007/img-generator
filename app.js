const express = require("express");
const app = express();

//.env
require('dotenv').config()

//set view engine
const ejs = require("ejs");
app.set("view engine", "ejs");
//set static files
app.use(express.static("public"));



//requsets
app.get("/", (req, res) => {
  const {OPENAI_API_KEY} = process.env
  res.render("index",{
    OPENAI_API_KEY
  });
});



//listen 8080
app.listen(8080, () => {
  console.log("http://localhost:8080/");
});
