const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  instructor: String,
  course_url: String,
  course_image: String,
  course_description: String,
  reviews_avg: String,
  reviews_count: String,
  course_duration: String,
  lectures_count: String,
  level: String,
  price_after_discount: String,
  main_price: String,
  course_flag: String, // Optional field, adjust as needed
  students_count: String,
});

// const Course = mongoose.model("Course", courseSchema);
const Course = mongoose.model("Course", courseSchema, "courses");

module.exports = Course;
