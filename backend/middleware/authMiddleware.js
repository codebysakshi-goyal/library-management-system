const jwt = require("jsonwebtoken");
const { get } = require("../config/db");

async function authMiddleware(request, response, next) {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await get(
      "SELECT id, full_name, email, role, roll_number, course, phone_number, created_at, updated_at FROM users WHERE id = ?",
      [decodedToken.id]
    );

    if (!user) {
      return response.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

module.exports = authMiddleware;
