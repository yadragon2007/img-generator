const express = require("express");
const app = express();

//.env
require("dotenv").config();

//set view engine
const ejs = require("ejs");
app.set("view engine", "ejs");
//set static files
app.use(express.static("public"));

//requsets
app.get("/", (req, res) => {
  res.render("index");
});
// get OPENAI_API_KEY
app.post("/get/key/", (req, res) => {
  const { OPENAI_API_KEY } = process.env;
  const response = OPENAI_API_KEY
  res.json(response)
});

//listen 8080
app.listen(8080, () => {
  console.log("http://localhost:8080/");
});
