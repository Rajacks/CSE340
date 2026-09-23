const flashMiddleware = (req, res, next) => {
  req.flash = (type, message) => {
    if (!req.session.flash) {
      req.session.flash = {};
    }

    if (!req.session.flash[type]) {
      req.session.flash[type] = [];
    }

    req.session.flash[type].push(message);
  };

  next();
};

const flashLocals = (req, res, next) => {
  res.locals.flash = req.session.flash || {};
  req.session.flash = {};

  next();
};

const flash = (req, res, next) => {
  flashMiddleware(req, res, () => {
    flashLocals(req, res, next);
  });
};

export { flashMiddleware, flashLocals, flash };
