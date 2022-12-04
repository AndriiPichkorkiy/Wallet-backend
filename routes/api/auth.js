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
// router.get("/verify/:verificationToken", ctrl.verify);
// router.post(
//   "/verify",
//   validateBody(schemas.verifyEmailSchema),
//   ctrl.resendEmail
// );

module.exports = router;
