const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    level: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
