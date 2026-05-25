const router = require("express").Router();
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/authMiddleware");
const c = require("../controllers/leadController");

router.use(protect);

const leadValidators = [
  body("firstName").trim().notEmpty().withMessage("First name required"),
  body("lastName").trim().notEmpty().withMessage("Last name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("phone").optional({ checkFalsy: true }).isString(),
  body("status").optional().isIn(["New","Contacted","Qualified","Proposal","Won","Lost"]),
  body("source").optional().isIn(["Website","Referral","LinkedIn","Email","Cold Call","Event","Other"]),
  body("priority").optional().isIn(["Low","Medium","High"]),
  body("dealValue").optional().isFloat({ min: 0 }),
];

router.get("/stats/summary", c.stats);
router.get("/", c.list);
router.post("/", leadValidators, validate, c.create);
router.get("/:id", [param("id").isMongoId()], validate, c.getOne);
router.put("/:id", [param("id").isMongoId(), ...leadValidators], validate, c.update);
router.delete("/:id", [param("id").isMongoId()], validate, c.remove);

module.exports = router;
