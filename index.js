// Importing our required modules
const express = require("express");
const axios = require("axios");
const ejs = require("ejs");

const app = express();
const api_key = "3188a02f829a47ba93ed37b2b58b4f06";

// Setting up EJS as our view engine
app.set("view engine", "ejs");

// Serving static files from the 'public' directory
app.use(express.static("public"));

// Parsing incoming request bodies
app.use(express.urlencoded({ extended: false }));

// Route to render the main search page
app.get("/", (req, res) => {
  res.render("index");
});

// Route to handle the search query and fetch recipes
app.post("/search", async (req, res) => {
  const { query } = req.body;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${api_key}`,
  );
  const recipes = response.data.results;
  res.render("results", { recipes });
});

// Route to display a specific recipe's details
app.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`,
  );
  const recipe = response.data;
  res.render("recipe", { recipe });
});

// Starting our server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000"); // Oops! This should be `console.log(`Server is running on port ${PORT}`)`
});
