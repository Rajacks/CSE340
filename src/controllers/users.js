import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/users.js";

/* =========================
   User Registration
========================= */

const showUserRegistrationForm = async (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

const processUserRegistrationForm = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await createUser(name, email, passwordHash);

    req.flash("notice", "Registration successful. Please log in.");
    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);

    req.flash(
      "notice",
      "Sorry, there was an error processing your registration.",
    );

    res.redirect("/register");
  }
};

/* =========================
   User Login
========================= */

const showLoginForm = async (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const processLoginForm = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      req.flash("notice", "Invalid email or password.");
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      req.flash("notice", "Invalid email or password.");
      return res.redirect("/login");
    }

    req.session.user = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    };

    req.flash("notice", `Welcome, ${user.name}!`);
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);

    req.flash("notice", "Sorry, there was an error processing your login.");
    res.redirect("/login");
  }
};

export {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
};
