import { getVolunteerProjects } from "../models/projects.js";

const showDashboard = async (req, res) => {
  try {
    // Week 6: Retrieve projects the logged-in user volunteers for.
    const userId = req.session.user.user_id;
    const volunteerProjects = await getVolunteerProjects(userId);

    // Render the dashboard with the user's volunteer projects.
    res.render("dashboard", {
      title: "Dashboard",
      volunteerProjects,
    });
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).send("An error occurred while loading your dashboard.");
  }
};

export { showDashboard };
