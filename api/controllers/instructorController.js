const Instructor = require("../models/instructorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// Instructor Registration
const registerInstructor = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if instructor with the same username or email already exists
    const existingInstructor = await Instructor.findOne({
      $or: [{ username }, { email }],
    });
    if (existingInstructor) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new instructor
    const instructor = new Instructor({
      username,
      password: hashedPassword,
      email,
    });
    await instructor.save();

    res.status(201).json({ message: "Instructor registered successfully" });
  } catch (error) {
    console.error("Error registering instructor:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Instructor Login
const loginInstructor = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find instructor by username
    const instructor = await Instructor.findOne({ username });
    if (!instructor) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, instructor.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: instructor._id, userType: "instructor" },
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
  registerInstructor,
  loginInstructor,
};
