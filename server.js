import "dotenv/config";
import express from "express";
import session from "express-session";
import { testConnection } from "./src/models/db.js";
import { flash } from "./src/middleware/flash.js";
import router from "./src/routes.js";

// Define the application environment
const nodeEnv = process.env.NODE_ENV?.toLowerCase() || "production";

// Define the port number the server will listen on
const port = process.env.PORT || 3000;

const app = express();

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  }),
);

app.use(flash);

// Configure EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

// Parse form data from POST requests
app.use(express.urlencoded({ extended: true }));

// Use the routes from src/routes.js
app.use(router);

// 404 handler for routes that do not exist
app.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "Page Not Found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).render("errors/500", {
    title: "Server Error",
  });
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
