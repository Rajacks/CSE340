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

const router = express.Router();

/* =========================
   Home
========================= */

router.get("/", showHomePage);

/* =========================
   Organizations
========================= */

router.get("/organizations", showOrganizationsPage);

router.get("/organization/:id", showOrganizationDetailsPage);

router.get("/new-organization", showNewOrganizationForm);

router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm,
);

router.get("/edit-organization/:id", showEditOrganizationForm);

router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm,
);

/* =========================
   Categories
========================= */

router.get("/categories", showCategoriesPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get("/new-category", showNewCategoryForm);

router.post("/new-category", categoryValidation, processNewCategoryForm);

router.get("/edit-category/:id", showEditCategoryForm);

router.post("/edit-category/:id", categoryValidation, processEditCategoryForm);

/* =========================
   Projects
========================= */

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);

router.get("/edit-project/:id", showEditProjectForm);

router.post("/edit-project/:id", projectValidation, processEditProjectForm);

router.get("/new-project", showNewProjectForm);

router.post("/new-project", projectValidation, processNewProjectForm);

router.get("/assign-categories/:projectId", showAssignCategoriesForm);

router.post("/assign-categories/:projectId", processAssignCategoriesForm);

/* =========================
   Testing
========================= */

router.get("/test-error", showTestError);

export default router;
