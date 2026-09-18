const showTestError = (req, res, next) => {
  const error = new Error("This is a test error.");
  next(error);
};

export { showTestError };
