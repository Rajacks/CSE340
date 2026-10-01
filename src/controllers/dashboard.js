const showDashboard = async (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
  });
};

export { showDashboard };
