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

/* =========================
   W04 Assignment - Create Organization
========================= */

const createOrganization = async (
  name,
  description,
  contactEmail,
  logoFilename,
) => {
  const query = `
        INSERT INTO public.organization (
            name,
            description,
            contact_email,
            logo_filename
        )
        VALUES ($1, $2, $3, $4)
        RETURNING organization_id;
    `;

  const queryParams = [name, description, contactEmail, logoFilename];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create organization");
  }

  return result.rows[0].organization_id;
};

/* =========================
   W04 Assignment - Update Organization
========================= */

const updateOrganization = async (
  organizationId,
  name,
  description,
  contactEmail,
  logoFilename,
) => {
  const query = `
        UPDATE public.organization
        SET
            name = $1,
            description = $2,
            contact_email = $3,
            logo_filename = $4
        WHERE organization_id = $5
        RETURNING organization_id;
    `;

  const queryParams = [
    name,
    description,
    contactEmail,
    logoFilename,
    organizationId,
  ];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Organization not found");
  }

  return result.rows[0].organization_id;
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganizationId,
  createOrganization,
  updateOrganization,
};
