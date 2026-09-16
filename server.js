import "dotenv/config";
import express from "express";
import { testConnection } from "./src/models/db.js";
import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllCategories } from "./src/models/categories.js";
import router from "./src/routes.js";

// Define the application environment
const nodeEnv = process.env.NODE_ENV?.toLowerCase() || "production";

// Define the port number the server will listen on
const port = process.env.PORT || 3000;

const app = express();

// Configure EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

// Use the routes from src/routes.js
app.use(router);

// Home page
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// Organizations page
app.get("/organizations", async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = "Our Partner Organizations";

  res.render("organizations", { title, organizations });
});

// Categories page
app.get("/categories", async (req, res) => {
  const categories = await getAllCategories();
  const title = "Categories";

  res.render("categories", { title, categories });
});

app.listen(port, async () => {
  try {
    await testConnection();

    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Environment: ${nodeEnv}`);
  } catch (error) {
    console.error("Unable to connect to the database.");
  }
});
