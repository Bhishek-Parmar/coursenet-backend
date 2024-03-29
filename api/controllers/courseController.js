const Course = require("../models/courseModel");

// Controller function to retrieve all courses
// const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getAllCourses = async (req, res) => {
  //isme agar direct /api/courses chala diya toh pure 5000 course aayenge aur agar ?page=1 de diya toh by default 10 limit h , par
  // ?limit=kuchh bhi likh skte . aise /api/course?page=2&limit=20 bhi kr skte. aur agar limit ke sang kuchh galat hua toh by default limit
  // 1 set kr di h , if else se apan dekh liya ki agar pagination use kr rhe toh 10 ki limit laga do bydefault
  try {
    const totalCount = await Course.countDocuments();
    // console.log(totalCount);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 1;
    if (req.query.page) {
      limit = req.query.limit ? parseInt(req.query.limit) : 10;
    } else {
      limit = req.query.limit
        ? parseInt(req.query.limit)
        : Math.max(totalCount, 10);
    }

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Fetch courses using pagination
    const courses = await Course.find().skip(skip).limit(limit);

    // Check if there are no courses found
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    // Return the array of courses
    res.json(courses);
  } catch (error) {
    // Send error response if there's an issue
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
