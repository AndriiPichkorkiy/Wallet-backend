const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// sign up
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post(
  "/verify/",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

// sign in
router.get("/login", validateBody(schemas.loginSchema), ctrl.login);
// router.get("/current", authenticate, ctrl.getCurrent);
// router.get("/logout", authenticate, ctrl.logout);

module.exports = router;
