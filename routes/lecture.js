const express = require("express");
const router = express.Router();

const {
  getLectureById,
  createLecture,
  getLecture,
  //   photo,
  deleteLecture,
  updateLecture,
  getAllLectures,
  getAllUniqueInstructers,
  getAllLecturesByCourse,
} = require("../controllers/lecture");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("lectureId", getLectureById);

//actual routes

//create route
router.post(
  "/lecture/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createLecture
);

//read routes
router.get("/lecture/:lectureId", getLecture);
// router.get("/lecture/photo/:lectureId", photo);

//delete route
router.delete(
  "/lecture/:lectureId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteLecture
);

//update route
router.put(
  "/lecture/:lectureId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateLecture
);

//listing route
router.get("/lectures", getAllLectures);

router.get("/lectures/instructers", getAllUniqueInstructers);

router.get("/lectures/:course", getAllLecturesByCourse);

module.exports = router;
