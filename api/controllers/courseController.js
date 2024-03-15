const Course = require("../models/courseModel");

// Controller function to retrieve all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to retrieve a specific course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new course
const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, courseData, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
