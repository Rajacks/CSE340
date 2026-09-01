import express from "express";

// Define the application environment
const nodeEnv = process.env.NODE_ENV?.toLowerCase() || "production";

// Define the port number the server will listen on
const port = process.env.PORT || 3000;

const app = express();

// Configure EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// Organizations page
app.get("/organizations", (req, res) => {
  res.render("organizations", { title: "Organizations" });
});

// Projects page
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects" });
});

// Categories page
app.get("/categories", (req, res) => {
  res.render("categories", { title: "Categories" });
});

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
  console.log(`Environment: ${nodeEnv}`);
});
