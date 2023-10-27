const { request } = require("express");
const Course = require("../models/course");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getCourseById = (req, res, next, id) => {
  Course.findById(id)
    .populate("instructer")
    .exec((err, course) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      req.course = course;
      next();
    });
};

exports.createCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    //destructure the fields
    const { name, description, instructer, level } = fields;

    //restrictions
    if (!name || !description || !level) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let course = new Course(fields);

    //file handling
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File too large",
        });
      }
      course.photo.data = fs.readFileSync(file.photo.path);
      course.photo.contentType = file.photo.type;
    }

    //save to the DB
    course.save((err, course) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
      res.json(course);
    });
  });
};

exports.getCourse = (req, res) => {
  req.course.photo = undefined;
  return res.json(req.course);
};

// exports.photo = (req, res, next) => {
//   if (res.Course.photo.data) {
//     res.set("Content-Type", req.Course.photo.contentType);
//     return res.send(req.Course.photo.data);
//   }
//   next();
// };

exports.photo = (req, res, next) => {
  if (req.course && req.course.photo && req.course.photo.data) {
    res.set("Content-Type", req.course.photo.contentType);
    return res.send(req.course.photo.data);
  }
  next();
};

//delete controller
exports.deleteCourse = (req, res) => {
  let course = req.course;
  course.remove((err, deletedCourse) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Deleted successfully",
      deletedCourse,
    });
  });
};

//update controller
exports.updateCourse = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    //updation code
    let course = req.course;
    course = _.extend(course, fields);

    //file handling
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File too large",
        });
      }
      course.photo.data = fs.readFileSync(file.photo.path);
      course.photo.contentType = file.photo.type;
    }

    //save to the DB
    course.save((err, course) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
      res.json(course);
    });
  });
};

//Course listing
exports.getAllCourses = (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Course.find()
    .select("-photo")
    .populate("instructer")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, courses) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.json(courses);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  course.distinct("instructer", {}, (err, instructer) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(instructer);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.Order.courses.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Course.bulkWrite(myOperations, {}, (err, courses) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation failed",
      });
    }
    next();
  });
};
