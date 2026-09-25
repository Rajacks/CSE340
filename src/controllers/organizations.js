import {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganizationId,
  createOrganization,
  updateOrganization,
} from "../models/organizations.js";

import { body, validationResult } from "express-validator";

/* =========================
   Organization Validation
========================= */

const organizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Organization name must be between 3 and 150 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Organization description is required")
    .isLength({ max: 500 })
    .withMessage("Organization description cannot exceed 500 characters"),

  body("contactEmail")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),
];

/* =========================
   Organization List
========================= */

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();

  const title = "Our Partner Organizations";

  res.render("organizations", { title, organizations });
};

/* =========================
   Organization Details
========================= */

const showOrganizationDetailsPage = async (req, res) => {
  const organizationId = req.params.id;

  const organization = await getOrganizationDetails(organizationId);

  if (!organization) {
    return res.status(404).render("errors/404", {
      title: "Page Not Found",
    });
  }

  const projects = await getProjectsByOrganizationId(organizationId);

  const title = organization.name;

  res.render("organization", {
    title,
    organization,
    projects,
  });
};

/* =========================
   Create Organization
========================= */

const showNewOrganizationForm = async (req, res) => {
  const title = "Add New Organization";

  res.render("new-organization", { title });
};

const processNewOrganizationForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect("/new-organization");
  }

  const { name, description, contactEmail } = req.body;

  const logoFilename = "placeholder-logo.png";

  try {
    const organizationId = await createOrganization(
      name,
      description,
      contactEmail,
      logoFilename,
    );

    req.flash("success", "Organization added successfully!");

    res.redirect(`/organization/${organizationId}`);
  } catch (error) {
    console.error("Error creating organization:", error);

    req.flash("error", "There was an error creating the organization.");

    res.redirect("/new-organization");
  }
};

/* =========================
   Edit Organization
========================= */

const showEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;

  const organization = await getOrganizationDetails(organizationId);

  if (!organization) {
    return res.status(404).render("errors/404", {
      title: "Page Not Found",
    });
  }

  const title = "Edit Organization";

  res.render("edit-organization", {
    title,
    organization,
  });
};

const processEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-organization/${organizationId}`);
  }

  const { name, description, contactEmail, logoFilename } = req.body;

  try {
    await updateOrganization(
      organizationId,
      name,
      description,
      contactEmail,
      logoFilename,
    );

    req.flash("success", "Organization updated successfully!");

    res.redirect(`/organization/${organizationId}`);
  } catch (error) {
    console.error("Error updating organization:", error);

    req.flash("error", "There was an error updating the organization.");

    res.redirect(`/edit-organization/${organizationId}`);
  }
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
};
