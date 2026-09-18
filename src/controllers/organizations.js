import {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganizationId,
} from "../models/organizations.js";

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations();

  const title = "Our Partner Organizations";

  res.render("organizations", { title, organizations });
};

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

  res.render("organization", { title, organization, projects });
};

export { showOrganizationsPage, showOrganizationDetailsPage };
