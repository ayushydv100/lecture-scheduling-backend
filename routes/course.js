const express = require("express");
const router = express.Router();

const {
  getCourseById,
  createCourse,
  getCourse,
  photo,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getAllUniqueCategories,
} = require("../controllers/course");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("courseId", getCourseById);

//actual routes

//create route
router.post(
  "/course/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCourse
);

//read routes
router.get("/course/:courseId", getCourse);
router.get("/course/photo/:courseId", photo);

//delete route
router.delete(
  "/course/:courseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCourse
);

//update route
router.put(
  "/course/:courseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCourse
);

//listing route
router.get("/courses", getAllCourses);

router.get("/courses/categories", getAllUniqueCategories);

module.exports = router;
