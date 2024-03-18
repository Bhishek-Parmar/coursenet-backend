const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// Student Registration
const registerStudent = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log("running");
    // Check if student with the same username or email already exists
    const existingStudent = await Student.findOne({
      $or: [{ username }, { email }],
    });
    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const student = new Student({ username, password: hashedPassword, email });
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error registering student:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Student Login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by username
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: student._id, userType: "student" },
      secretKey,
      { expiresIn: "1h" }
    );

    // Send token back to client
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
};
