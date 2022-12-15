const express = require("express");
const ctrl = require("../../controllers/news");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

// sign up
router.get("/", authenticate, ctrlWrapper(ctrl.get));

module.exports = router;
