const express = require("express");
const app = express();
const connectToDb = require("./connectToDb");
const cors = require("cors");
const coursesController = require("./controllers/courseController");
const studentController = require("./controllers/studentController");
const instructorController = require("./controllers/instructorController");
const verifyToken = require("./middlewares/verifyToken");

const bodyParser = require("body-parser");

connectToDb();
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use(express.json());

// Routes---------------
//course routes
app.get("/api/courses", coursesController.getAllCourses);
app.get("/api/courses/:id", coursesController.getCourseById);
app.post("/api/courses", coursesController.createCourse);
app.put("/api/courses/:id", coursesController.updateCourse);
app.delete("/api/courses/:id", coursesController.deleteCourse);

// Student authentication routes
app.post("/api/student/register", studentController.registerStudent);
app.post("/api/student/login", studentController.loginStudent);
app.get("/api/student/:id", studentController.studentById);

// Instructor authentication routes
app.post("/api/instructor/register", instructorController.registerInstructor);
app.post("/api/instructor/login", instructorController.loginInstructor);
app.get("/api/instructor/:id", instructorController.instructorById);

app.get("/api/protected-route", verifyToken, (req, res) => {
  // This route is protected and can only be accessed with a valid token
  res.json({
    message: "Authenticated request",
    user: req.user,
    userId: req.user.userId,
  });
});

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;
