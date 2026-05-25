const router = require("express").Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Demo credentials
  if (email === "admin@crm.io" && password === "admin123") {
    return res.status(200).json({
      success: true,
      user: {
        name: "Admin",
        email: "admin@crm.io",
      },
      token: "demo-token-123",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

module.exports = router;