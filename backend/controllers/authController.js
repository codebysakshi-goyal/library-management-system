const bcrypt = require("bcryptjs");
const { get, run } = require("../config/db");
const generateToken = require("../utils/generateToken");

async function registerStudent(request, response) {
  try {
    const {
      full_name,
      email,
      password,
      roll_number,
      course,
      phone_number
    } = request.body;

    if (!full_name || !email || !password || !roll_number || !course || !phone_number) {
      return response.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return response.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    const existingUser = await get(
      "SELECT id FROM users WHERE email = ? OR roll_number = ? LIMIT 1",
      [email.trim(), roll_number.trim()]
    );

    if (existingUser) {
      return response.status(400).json({
        success: false,
        message: "Email or roll number already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await run(
      `INSERT INTO users (full_name, email, password, role, roll_number, course, phone_number)
       VALUES (?, ?, ?, 'student', ?, ?, ?)`,
      [
        full_name.trim(),
        email.trim().toLowerCase(),
        hashedPassword,
        roll_number.trim(),
        course.trim(),
        phone_number.trim()
      ]
    );

    return response.status(201).json({
      success: true,
      message: "Student registered successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to register student"
    });
  }
}

async function loginUser(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await get("SELECT * FROM users WHERE email = ? LIMIT 1", [
      email.trim().toLowerCase()
    ]);

    if (!user) {
      return response.status(401).json({
        success: false,
        message: "Invalid login credentials"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(401).json({
        success: false,
        message: "Invalid login credentials"
      });
    }

    const token = generateToken(user);

    return response.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        roll_number: user.roll_number,
        course: user.course,
        phone_number: user.phone_number
      }
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to login"
    });
  }
}

function getCurrentUser(request, response) {
  return response.json({
    success: true,
    user: request.user
  });
}

module.exports = {
  registerStudent,
  loginUser,
  getCurrentUser
};
