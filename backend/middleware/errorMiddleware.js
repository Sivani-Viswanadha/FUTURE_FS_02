exports.notFound = (req, res) => res.status(404).json({ message: `Route not found: ${req.originalUrl}` });

exports.errorHandler = (err, req, res, _next) => {
  console.error("[Error]", err);
  const status = err.statusCode || (err.name === "ValidationError" ? 400 : 500);
  res.status(status).json({
    message: err.message || "Server error",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
