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
} from "./controllers/organizations.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
} from "./controllers/categories.js";

import { showTestError } from "./controllers/errors.js";

import { showHomePage } from "./controllers/home.js";

const router = express.Router();

router.get("/", showHomePage);

router.get("/organizations", showOrganizationsPage);

router.get("/categories", showCategoriesPage);

router.get("/projects", showProjectsPage);

router.get("/project/:id", showProjectDetailsPage);

/* =========================
   Week 4 - Edit Project
========================= */

router.get("/edit-project/:id", showEditProjectForm);

router.post("/edit-project/:id", processEditProjectForm);

/* =========================
   Week 4 - Create Project
========================= */

router.get("/new-project", showNewProjectForm);

router.post("/new-project", projectValidation, processNewProjectForm);

/* =========================
   Week 4 - Assign Categories
========================= */

router.get("/assign-categories/:projectId", showAssignCategoriesForm);

router.post("/assign-categories/:projectId", processAssignCategoriesForm);

router.get("/organization/:id", showOrganizationDetailsPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get("/test-error", showTestError);

export default router;
