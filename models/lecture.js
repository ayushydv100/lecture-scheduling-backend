const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const lectureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    course: {
      type: ObjectId,
      ref: "Course",
      required: true,
    },
    instructer: {
      type: ObjectId,
      ref: "Instructer",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
