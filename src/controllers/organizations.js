import { getOrganizationDetails } from "../models/organizations.js";

const showOrganizationDetailsPage = async (req, res) => {
  const organizationId = req.params.id;

  const organization = await getOrganizationDetails(organizationId);

  if (!organization) {
    return res.status(404).render("errors/404", {
      title: "Page Not Found",
    });
  }

  const title = organization.name;

  res.render("organization", { title, organization });
};

export { showOrganizationDetailsPage };
