const { all, get, run } = require("../config/db");

function isOverdue(issueDate, status) {
  if (status !== "issued") {
    return false;
  }

  return new Date().toISOString().split("T")[0] > issueDate;
}

function addOverdueFlag(record) {
  return {
    ...record,
    overdue: isOverdue(record.due_date, record.status)
  };
}

async function createIssue(request, response) {
  try {
    const { student_id, book_id, due_date } = request.body;
    const studentId = Number(student_id);
    const bookId = Number(book_id);
    const today = new Date().toISOString().split("T")[0];

    if (!studentId || !bookId || !due_date) {
      return response.status(400).json({
        success: false,
        message: "Student, book and due date are required"
      });
    }

    if (due_date < today) {
      return response.status(400).json({
        success: false,
        message: "Due date should not be before today"
      });
    }

    const student = await get(
      "SELECT id FROM users WHERE id = ? AND role = 'student'",
      [studentId]
    );
    const book = await get("SELECT * FROM books WHERE id = ?", [bookId]);

    if (!student) {
      return response.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    if (!book) {
      return response.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    if (Number(book.available_copies) < 1) {
      return response.status(400).json({
        success: false,
        message: "Selected book is not available"
      });
    }

    const duplicateIssue = await get(
      `SELECT id FROM issue_records
       WHERE student_id = ? AND book_id = ? AND status = 'issued'
       LIMIT 1`,
      [studentId, bookId]
    );

    if (duplicateIssue) {
      return response.status(400).json({
        success: false,
        message: "This student already has this book issued"
      });
    }

    await run(
      `INSERT INTO issue_records (student_id, book_id, issue_date, due_date, status)
       VALUES (?, ?, ?, ?, 'issued')`,
      [studentId, bookId, today, due_date]
    );

    await run(
      `UPDATE books
       SET available_copies = available_copies - 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [bookId]
    );

    return response.status(201).json({
      success: true,
      message: "Book issued successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to issue book"
    });
  }
}

async function getIssues(request, response) {
  try {
    const issues = await all(
      `SELECT issue_records.id, users.full_name AS student_name, users.roll_number,
              books.title AS book_title, issue_records.issue_date, issue_records.due_date,
              issue_records.return_date, issue_records.status
       FROM issue_records
       INNER JOIN users ON users.id = issue_records.student_id
       INNER JOIN books ON books.id = issue_records.book_id
       ORDER BY issue_records.created_at DESC`
    );

    return response.json({
      success: true,
      issues: issues.map(addOverdueFlag)
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch issue records"
    });
  }
}

async function getMyIssues(request, response) {
  try {
    const issues = await all(
      `SELECT issue_records.id, books.title AS book_title, books.author, books.category,
              issue_records.issue_date, issue_records.due_date, issue_records.return_date,
              issue_records.status
       FROM issue_records
       INNER JOIN books ON books.id = issue_records.book_id
       WHERE issue_records.student_id = ?
       ORDER BY issue_records.created_at DESC`,
      [request.user.id]
    );

    return response.json({
      success: true,
      issues: issues.map(addOverdueFlag)
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch your issued books"
    });
  }
}

async function returnIssue(request, response) {
  try {
    const issueId = Number(request.params.id);

    if (!issueId) {
      return response.status(400).json({
        success: false,
        message: "Invalid issue id"
      });
    }

    const issue = await get("SELECT * FROM issue_records WHERE id = ?", [issueId]);

    if (!issue) {
      return response.status(404).json({
        success: false,
        message: "Issue record not found"
      });
    }

    if (issue.status === "returned") {
      return response.status(400).json({
        success: false,
        message: "Book is already returned"
      });
    }

    const returnDate = new Date().toISOString().split("T")[0];

    await run(
      `UPDATE issue_records
       SET status = 'returned', return_date = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [returnDate, issueId]
    );

    await run(
      `UPDATE books
       SET available_copies = available_copies + 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [issue.book_id]
    );

    return response.json({
      success: true,
      message: "Book returned successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to return book"
    });
  }
}

async function getDashboardSummary(request, response) {
  try {
    const totalBooksRow = await get("SELECT COUNT(*) AS count FROM books");
    const totalStudentsRow = await get(
      "SELECT COUNT(*) AS count FROM users WHERE role = 'student'"
    );
    const totalIssuedBooksRow = await get(
      "SELECT COUNT(*) AS count FROM issue_records WHERE status = 'issued'"
    );
    const totalAvailableBooksRow = await get(
      "SELECT COALESCE(SUM(available_copies), 0) AS count FROM books"
    );
    const recentBooks = await all(
      "SELECT id, title, author, category, created_at FROM books ORDER BY created_at DESC LIMIT 5"
    );
    const recentIssues = await all(
      `SELECT issue_records.id, users.full_name AS student_name, books.title AS book_title,
              issue_records.issue_date, issue_records.due_date, issue_records.status
       FROM issue_records
       INNER JOIN users ON users.id = issue_records.student_id
       INNER JOIN books ON books.id = issue_records.book_id
       ORDER BY issue_records.created_at DESC
       LIMIT 5`
    );

    return response.json({
      success: true,
      summary: {
        total_books: totalBooksRow.count,
        total_students: totalStudentsRow.count,
        total_issued_books: totalIssuedBooksRow.count,
        total_available_books: totalAvailableBooksRow.count
      },
      recentBooks,
      recentIssues: recentIssues.map(addOverdueFlag)
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary"
    });
  }
}

module.exports = {
  createIssue,
  getIssues,
  getMyIssues,
  returnIssue,
  getDashboardSummary
};
