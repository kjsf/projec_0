exports.notFound = (req, res, next) => {
  const err = new Error(`Error 404: Page not found`);
  res.status(404);
  next(err);
};

exports.errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  if ((process.env.NODE_ENV = "production")) {
    msg = error.message;
    res.render("error", { msg });
  } else {
    res.json({
      message: error.message,
      stack: error.stack,
    });
  }
};
