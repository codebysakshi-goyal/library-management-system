const { all, get, run } = require("../config/db");

async function getStudents(request, response) {
  try {
    const students = await all(
      `SELECT id, full_name, email, roll_number, course, phone_number, 'active' AS status, created_at
       FROM users
       WHERE role = 'student'
       ORDER BY created_at DESC`
    );

    return response.json({
      success: true,
      students
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
}

async function getStudentById(request, response) {
  try {
    const studentId = Number(request.params.id);

    if (!studentId) {
      return response.status(400).json({
        success: false,
        message: "Invalid student id"
      });
    }

    const student = await get(
      `SELECT id, full_name, email, roll_number, course, phone_number, created_at, updated_at
       FROM users
       WHERE id = ? AND role = 'student'`,
      [studentId]
    );

    if (!student) {
      return response.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const issueRecords = await all(
      `SELECT issue_records.id, books.title, issue_records.issue_date, issue_records.due_date,
              issue_records.return_date, issue_records.status
       FROM issue_records
       INNER JOIN books ON books.id = issue_records.book_id
       WHERE issue_records.student_id = ?
       ORDER BY issue_records.created_at DESC`,
      [studentId]
    );

    return response.json({
      success: true,
      student,
      issueRecords
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch student details"
    });
  }
}

async function updateProfile(request, response) {
  try {
    const { full_name, course, phone_number } = request.body;

    if (!full_name || !course || !phone_number) {
      return response.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    await run(
      `UPDATE users
       SET full_name = ?, course = ?, phone_number = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [full_name.trim(), course.trim(), phone_number.trim(), request.user.id]
    );

    const updatedUser = await get(
      `SELECT id, full_name, email, role, roll_number, course, phone_number, created_at, updated_at
       FROM users WHERE id = ?`,
      [request.user.id]
    );

    return response.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
}

async function deleteStudent(request, response) {
  try {
    const studentId = Number(request.params.id);

    if (!studentId) {
      return response.status(400).json({
        success: false,
        message: "Invalid student id"
      });
    }

    const student = await get(
      "SELECT id FROM users WHERE id = ? AND role = 'student'",
      [studentId]
    );

    if (!student) {
      return response.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const activeIssue = await get(
      "SELECT id FROM issue_records WHERE student_id = ? AND status = 'issued' LIMIT 1",
      [studentId]
    );

    if (activeIssue) {
      return response.status(400).json({
        success: false,
        message: "Student cannot be deleted because active issued books exist"
      });
    }

    await run("DELETE FROM users WHERE id = ? AND role = 'student'", [studentId]);

    return response.json({
      success: true,
      message: "Student deleted successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to delete student"
    });
  }
}

module.exports = {
  getStudents,
  getStudentById,
  updateProfile,
  deleteStudent
};
