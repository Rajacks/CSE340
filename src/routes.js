import express from "express";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showEditProjectForm,
  processEditProjectForm,
  showNewProjectForm,
  processNewProjectForm,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  projectValidation,
} from "./controllers/projects.js";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
} from "./controllers/organizations.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
} from "./controllers/categories.js";

import { showTestError } from "./controllers/errors.js";
import { showHomePage } from "./controllers/home.js";
import { showDashboard } from "./controllers/dashboard.js";
import { showUsersPage } from "./controllers/admin.js";

import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  logoutUser,
} from "./controllers/users.js";

import { requireLogin, requireRole } from "./middleware/auth.js";

const router = express.Router();

/* =========================
   Home
========================= */

router.get("/", showHomePage);

router.get("/dashboard", requireLogin, showDashboard);

router.get("/users", requireRole(2, "/dashboard"), showUsersPage);

/* =========================
   User Registration
========================= */

router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);

/* =========================
   User Login
========================= */

router.get("/login", showLoginForm);
router.post("/login", processLoginForm);

/* =========================
   User Logout
========================= */

router.get("/logout", logoutUser);

/* =========================
   Organizations
========================= */

router.get("/organizations", showOrganizationsPage);

router.get("/organization/:id", showOrganizationDetailsPage);

router.get("/new-organization", requireRole(2), showNewOrganizationForm);

router.post(
  "/new-organization",
  requireRole(2),
  organizationValidation,
  processNewOrganizationForm,
);

router.get("/edit-organization/:id", requireRole(2), showEditOrganizationForm);

router.post(
  "/edit-organization/:id",
  requireRole(2),
  organizationValidation,
  processEditOrganizationForm,
);

/* =========================
   Categories
========================= */

router.get("/categories", showCategoriesPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get("/new-category", requireRole(2), showNewCategoryForm);

router.post(
  "/new-category",
  requireRole(2),
  categoryValidation,
  processNewCategoryForm,
);

router.get("/edit-category/:id", requireRole(2), showEditCategoryForm);

router.post(
  "/edit-category/:id",
  requireRole(2),
  categoryValidation,
  processEditCategoryForm,
);

/* =========================
   Projects
========================= */

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);

router.get("/edit-project/:id", requireRole(2), showEditProjectForm);

router.post(
  "/edit-project/:id",
  requireRole(2),
  projectValidation,
  processEditProjectForm,
);

router.get("/new-project", requireRole(2), showNewProjectForm);

router.post(
  "/new-project",
  requireRole(2),
  projectValidation,
  processNewProjectForm,
);

router.get(
  "/assign-categories/:projectId",
  requireRole(2),
  showAssignCategoriesForm,
);

router.post(
  "/assign-categories/:projectId",
  requireRole(2),
  processAssignCategoriesForm,
);

/* =========================
   Testing
========================= */

router.get("/test-error", showTestError);

export default router;
