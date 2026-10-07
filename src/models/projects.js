import db from "./db.js";

const getAllProjects = async () => {
  const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.project_date,
               o.name AS organization_name
        FROM public.projects AS p
        INNER JOIN public.organization AS o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.projects AS p
        INNER JOIN public.organization AS o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

  const queryParams = [number_of_projects];

  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM public.projects AS p
        INNER JOIN public.organization AS o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

  const queryParams = [id];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date
        FROM public.projects AS p
        INNER JOIN public.project_category AS pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date;
    `;

  const queryParams = [categoryId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

/* =========================
   Week 4 - Update Project
========================= */

const updateProject = async (
  projectId,
  title,
  description,
  location,
  date,
  organizationId,
) => {
  const query = `
        UPDATE public.projects
        SET
            title = $1,
            description = $2,
            location = $3,
            project_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

  const queryParams = [
    title,
    description,
    location,
    date,
    organizationId,
    projectId,
  ];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to update project");
  }

  return result.rows[0].project_id;
};

/* =========================
   Week 4 - Create Project
========================= */

const createProject = async (
  title,
  description,
  location,
  date,
  organizationId,
) => {
  const query = `
        INSERT INTO public.projects (
            title,
            description,
            location,
            project_date,
            organization_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

  const queryParams = [title, description, location, date, organizationId];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create project");
  }

  return result.rows[0].project_id;
};

/* =========================
   Week 6 - Volunteering
========================= */

/* Add a user as a volunteer for a project */
const addVolunteer = async (userId, projectId) => {
  const query = `
        INSERT INTO public.project_volunteer (
            user_id,
            project_id
        )
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id)
        DO NOTHING;
    `;

  const queryParams = [userId, projectId];

  await db.query(query, queryParams);
};

/* Remove a user from a project's volunteers */
const removeVolunteer = async (userId, projectId) => {
  const query = `
        DELETE FROM public.project_volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

  const queryParams = [userId, projectId];

  await db.query(query, queryParams);
};

/* Get all projects a user has volunteered for */
const getVolunteerProjects = async (userId) => {
  const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name
        FROM public.project_volunteer AS pv
        INNER JOIN public.projects AS p
            ON pv.project_id = p.project_id
        INNER JOIN public.organization AS o
            ON p.organization_id = o.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.project_date;
    `;

  const queryParams = [userId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

/* Check if a user is already volunteering for a project */
const checkVolunteer = async (userId, projectId) => {
  const query = `
        SELECT 1
        FROM public.project_volunteer
        WHERE user_id = $1
        AND project_id = $2;
    `;

  const queryParams = [userId, projectId];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0;
};

export {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByCategoryId,
  updateProject,
  createProject,
  addVolunteer,
  removeVolunteer,
  getVolunteerProjects,
  checkVolunteer,
};
