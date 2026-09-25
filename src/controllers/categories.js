import {
  getAllCategories,
  getCategoryDetails,
  createCategory,
  updateCategory,
} from "../models/categories.js";

import { getProjectsByCategoryId } from "../models/projects.js";

import { body, validationResult } from "express-validator";

/* =========================
   Category Validation
========================= */

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
];

/* =========================
   Category List
========================= */

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();

  const title = "Categories";

  res.render("categories", {
    title,
    categories,
  });
};

/* =========================
   Category Details
========================= */

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryDetails(categoryId);

  if (!category) {
    return res.status(404).render("errors/404", {
      title: "Page Not Found",
    });
  }

  const projects = await getProjectsByCategoryId(categoryId);

  const title = category.name;

  res.render("category", {
    title,
    category,
    projects,
  });
};

/* =========================
   Create Category
========================= */

const showNewCategoryForm = async (req, res) => {
  const title = "Add New Category";

  res.render("new-category", {
    title,
  });
};

const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect("/new-category");
  }

  const { name } = req.body;

  try {
    const categoryId = await createCategory(name);

    req.flash("success", "Category added successfully!");

    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error("Error creating category:", error);

    req.flash("error", "There was an error creating the category.");

    res.redirect("/new-category");
  }
};

/* =========================
   Edit Category
========================= */

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryDetails(categoryId);

  if (!category) {
    return res.status(404).render("errors/404", {
      title: "Page Not Found",
    });
  }

  const title = "Edit Category";

  res.render("edit-category", {
    title,
    category,
  });
};

const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-category/${categoryId}`);
  }

  const { name } = req.body;

  try {
    await updateCategory(categoryId, name);

    req.flash("success", "Category updated successfully!");

    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error("Error updating category:", error);

    req.flash("error", "There was an error updating the category.");

    res.redirect(`/edit-category/${categoryId}`);
  }
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
};
