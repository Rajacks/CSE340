import db from "./db.js";

const getAllOrganizations = async () => {
  const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getOrganizationDetails = async (organizationId) => {
  const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organization
        WHERE organization_id = $1;
    `;

  const queryParams = [organizationId];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
            project_id,
            title,
            description,
            location,
            project_date
        FROM public.projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

  const queryParams = [organizationId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganizationId,
};
