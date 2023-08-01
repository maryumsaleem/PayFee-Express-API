const express = require("express");
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "../config/config.env" });

//-- *********** Import Controller Functions *********** --//
const schoolController = require("../controllers/schoolController");
//-- *********** Import Controller Functions *********** --//
const authController = require("../controllers/authController");
const { Protect } = require("../utils/protect");
const { RestrictTo } = require("../utils/restrict");

//! *** User Routes ***!//
router.post("/login", authController.Login);
router.post("/signup", authController.Signup);

//! *** School Routes ***!//
router
  .route("/school")
  .get(schoolController.getSchool)
  .post(schoolController.addSchool);

router
  .route("/school/:id")
  .get(schoolController.singleSchool)
  .patch(Protect, RestrictTo("admin", "user"), schoolController.updateSchool)
  .delete(Protect, RestrictTo("admin", "user"), schoolController.removeSchool);

module.exports = router;
