const { request } = require("express");
const Lecture = require("../models/lecture");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// const Lecture = require("./models/lecture");

exports.getLectureById = (req, res, next, id) => {
  Lecture.findById(id)
    .populate("instructer")
    .exec((err, lecture) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      req.lecture = lecture;
      next();
    });
};

exports.createLecture = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    // Destructure the fields
    const { name, course, instructer, date } = fields;

    //restrictions
    if (!name || !course || !date || !instructer) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    // Check if the lecture already exists with the same instructor and date
    Lecture.findOne({ instructer, date }, (err, existingLecture) => {
      if (existingLecture) {
        return res.status(400).json({
          error:
            "An instructor cannot have multiple lectures on the same date.",
        });
      }

      // If no existing lecture found, continue with creating the new lecture
      let lecture = new Lecture(fields);

      lecture.save((err, Lecture) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
        res.json(lecture);
      });
    });
  });
};

exports.getLecture = (req, res) => {
  //   req.lecture.photo = undefined;
  return res.json(req.lecture);
};

// exports.photo = (req, res, next) => {
//   if (res.Lecture.photo.data) {
//     res.set("Content-Type", req.Lecture.photo.contentType);
//     return res.send(req.Lecture.photo.data);
//   }
//   next();
// };

// exports.photo = (req, res, next) => {
//   if (req.Lecture && req.Lecture.photo && req.Lecture.photo.data) {
//     res.set("Content-Type", req.Lecture.photo.contentType);
//     return res.send(req.Lecture.photo.data);
//   }
//   next();
// };

//delete controller
exports.deleteLecture = (req, res) => {
  let lecture = req.lecture;
  lecture.remove((err, deletedLecture) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Deleted successfully",
      deletedLecture,
    });
  });
};

//update controller
exports.updateLecture = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    //updation code
    let lecture = req.lecture;
    lecture = _.extend(lecture, fields);

    //file handling
    // if (file.photo) {
    //   if (file.photo.size > 3000000) {
    //     return res.status(400).json({
    //       error: "File too large",
    //     });
    //   }
    //   Lecture.photo.data = fs.readFileSync(file.photo.path);
    //   Lecture.photo.contentType = file.photo.type;
    // }

    //save to the DB
    lecture.save((err, lecture) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
      res.json(lecture);
    });
  });
};

//Lecture listing
exports.getAllLectures = (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Lecture.find()
    // .select("-photo")
    .populate("instructer")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, lectures) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.json(lectures);
    });
};

exports.getAllUniqueInstructers = (req, res) => {
  Lecture.distinct("instructer", {}, (err, instructer) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(instructer);
  });
};

// exports.updateStock = (req, res, next) => {
//   let myOperations = req.body.Order.lectures.map((prod) => {
//     return {
//       updateOne: {
//         filter: { _id: prod._id },
//         update: { $inc: { stock: -prod.count, sold: +prod.count } },
//       },
//     };
//   });

//   Lecture.bulkWrite(myOperations, {}, (err, Lectures) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Bulk Operation failed",
//       });
//     }
//     next();
//   });
// };

// Function to get all lectures with the same course
exports.getAllLecturesByCourse = (req, res) => {
  const course = req.params.course; // Get the course parameter from the URL
  console.log(req.params.course);

  Lecture.find({ course: course }) // Find all lectures with the specified course
    .populate([
      {
        path: "course",
        model: "Course",
      },
      {
        path: "instructer",
        model: "Instructer",
      },
    ])
    .exec((err, lectures) => {
      console.log({ lectures });
      if (err) {
        return res.status(400).json({
          error: "Error while fetching lectures",
        });
      }
      res.json(lectures);
    });
};
