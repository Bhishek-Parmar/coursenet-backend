const express = require("express");
const app = express();
const connectToDb = require("./connectToDb");
const cors = require("cors");
const coursesController = require("./controllers/courseController");
const bodyParser = require("body-parser");

connectToDb();
app.get("/", (req, res) => res.send("Express on Vercel"));

// Routes
app.get("/api/courses", coursesController.getAllCourses);
app.get("/api/courses/:id", coursesController.getCourseById);
app.post("/api/courses", coursesController.createCourse);
app.put("/api/courses/:id", coursesController.updateCourse);
app.delete("/api/courses/:id", coursesController.deleteCourse);

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;
