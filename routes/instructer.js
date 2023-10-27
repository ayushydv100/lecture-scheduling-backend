const express = require("express");
const router = express.Router();

const {
  getInstructerById,
  createInstructer,
  getInstructer,
  getAllInstructer,
  updateInstructer,
  removeInstructer,
} = require("../controllers/instructer");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("instructerId", getInstructerById);

//actual routers

//create routes
router.post(
  "/instructer/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createInstructer
);

//read routes
router.get("/instructer/:instructerId", getInstructer);
router.get("/instructers", getAllInstructer);

//update routes
router.put(
  "/instructer/:instructerId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateInstructer
);

//delete routes
router.delete(
  "/instructer/:instructerId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeInstructer
);

module.exports = router;
