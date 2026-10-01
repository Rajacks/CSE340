/* =========================
   Require Login
========================= */

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("notice", "Please log in to access that page.");
    return res.redirect("/login");
  }

  next();
};

/* =========================
   Require Admin Role
========================= */

const requireRole = (roleId, redirectPath = "/") => {
  return (req, res, next) => {
    if (!req.session.user) {
      req.flash("notice", "Please log in to access that page.");
      return res.redirect("/login");
    }

    if (req.session.user.role_id !== roleId) {
      req.flash("notice", "You do not have permission to access that page.");
      return res.redirect(redirectPath);
    }

    next();
  };
};

export { requireLogin, requireRole };
