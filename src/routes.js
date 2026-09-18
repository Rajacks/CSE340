import express from "express";

import {
  showProjectsPage,
  showProjectDetailsPage,
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

router.get("/organization/:id", showOrganizationDetailsPage);

router.get("/category/:id", showCategoryDetailsPage);

router.get("/test-error", showTestError);

export default router;
