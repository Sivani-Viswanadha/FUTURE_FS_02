exports.protect = async (req, res, next) => {
  try {
    req.user = {
      _id: "507f1f77bcf86cd799439011",
      id: "507f1f77bcf86cd799439011",
      name: "Admin",
      email: "admin@crm.io",
      role: "admin",
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authorization failed",
    });
  }
};

exports.adminOnly = (req, res, next) => {
  next();
};