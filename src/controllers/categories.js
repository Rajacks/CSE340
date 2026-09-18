import { getAllCategories, getCategoryDetails } from "../models/categories.js";

import { getProjectsByCategoryId } from "../models/projects.js";

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();

  const title = "Categories";

  res.render("categories", { title, categories });
};

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

  res.render("category", { title, category, projects });
};

export { showCategoriesPage, showCategoryDetailsPage };
