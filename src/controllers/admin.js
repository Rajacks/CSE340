import { getAllUsers } from "../models/users.js";

const showUsersPage = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.render("users", {
      title: "All Users",
      users,
    });
  } catch (error) {
    console.error("Users page error:", error);

    res.status(500).render("errors/500", {
      title: "Server Error",
    });
  }
};

export { showUsersPage };
