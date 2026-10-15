
const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  register,
  login,
  profile
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Please check the submitted information.",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }))
    });
  }

  next();
};

const registrationRules = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must contain 2 to 80 characters."),

  body("email")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .isString()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must contain 8 to 72 characters.")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number.")
];

const loginRules = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email address."),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ max: 72 })
    .withMessage("Password is too long.")
];

router.post(
  "/register",
  registrationRules,
  validateRequest,
  register
);

router.post(
  "/login",
  loginRules,
  validateRequest,
  login
);

router.get("/profile", authMiddleware, profile);

module.exports = router;
