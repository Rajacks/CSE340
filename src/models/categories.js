import db from "./db.js";

/* =========================
   Get All Categories
========================= */

const getAllCategories = async () => {
  const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY category_id;
    `;

  const result = await db.query(query);

  return result.rows;
};

/* =========================
   Get Category Details
========================= */

const getCategoryDetails = async (categoryId) => {
  const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

  const queryParams = [categoryId];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

/* =========================
   Get Categories By Project
========================= */

const getCategoriesByProjectId = async (projectId) => {
  const query = `
        SELECT c.category_id, c.name
        FROM public.category AS c
        INNER JOIN public.project_category AS pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_id;
    `;

  const queryParams = [projectId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

/* =========================
   W04 Assignment - Create Category
========================= */

const createCategory = async (name) => {
  const query = `
        INSERT INTO public.category (
            name
        )
        VALUES ($1)
        RETURNING category_id;
    `;

  const queryParams = [name];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create category");
  }

  return result.rows[0].category_id;
};

/* =========================
   W04 Assignment - Update Category
========================= */

const updateCategory = async (categoryId, name) => {
  const query = `
        UPDATE public.category
        SET
            name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

  const queryParams = [name, categoryId];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Category not found");
  }

  return result.rows[0].category_id;
};

/* =========================
   W04 Assignment - Assign Categories
========================= */

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
        INSERT INTO public.project_category (
            project_id,
            category_id
        )
        VALUES ($1, $2)
        ON CONFLICT (project_id, category_id) DO NOTHING;
    `;

  const queryParams = [projectId, categoryId];

  await db.query(query, queryParams);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
        DELETE FROM public.project_category
        WHERE project_id = $1;
    `;

  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

export {
  getAllCategories,
  getCategoryDetails,
  getCategoriesByProjectId,
  createCategory,
  updateCategory,
  assignCategoryToProject,
  updateCategoryAssignments,
};
