const { all, get, run } = require("../config/db");

function buildBookStatus(book) {
  return {
    ...book,
    status: Number(book.available_copies) > 0 ? "Available" : "Not Available"
  };
}

async function getBooks(request, response) {
  try {
    const search = request.query.search ? request.query.search.trim() : "";
    const category = request.query.category ? request.query.category.trim() : "";

    let query = "SELECT * FROM books WHERE 1 = 1";
    const params = [];

    if (search) {
      query += " AND (title LIKE ? OR author LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    query += " ORDER BY created_at DESC";

    const books = await all(query, params);

    return response.json({
      success: true,
      books: books.map(buildBookStatus)
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch books"
    });
  }
}

async function getBookById(request, response) {
  try {
    const bookId = Number(request.params.id);

    if (!bookId) {
      return response.status(400).json({
        success: false,
        message: "Invalid book id"
      });
    }

    const book = await get("SELECT * FROM books WHERE id = ?", [bookId]);

    if (!book) {
      return response.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    return response.json({
      success: true,
      book: buildBookStatus(book)
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to fetch book"
    });
  }
}

async function addBook(request, response) {
  try {
    const {
      title,
      author,
      category,
      isbn,
      total_copies,
      shelf_location,
      description
    } = request.body;

    const totalCopies = Number(total_copies);

    if (!title || !author || !category || !isbn || !totalCopies) {
      return response.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    if (totalCopies < 1) {
      return response.status(400).json({
        success: false,
        message: "Total copies must be at least 1"
      });
    }

    const existingBook = await get("SELECT id FROM books WHERE isbn = ? LIMIT 1", [
      isbn.trim()
    ]);

    if (existingBook) {
      return response.status(400).json({
        success: false,
        message: "ISBN already exists"
      });
    }

    await run(
      `INSERT INTO books
      (title, author, category, isbn, total_copies, available_copies, shelf_location, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        author.trim(),
        category.trim(),
        isbn.trim(),
        totalCopies,
        totalCopies,
        shelf_location ? shelf_location.trim() : "",
        description ? description.trim() : ""
      ]
    );

    return response.status(201).json({
      success: true,
      message: "Book added successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to add book"
    });
  }
}

async function updateBook(request, response) {
  try {
    const bookId = Number(request.params.id);
    const {
      title,
      author,
      category,
      total_copies,
      shelf_location,
      description
    } = request.body;

    if (!bookId) {
      return response.status(400).json({
        success: false,
        message: "Invalid book id"
      });
    }

    if (!title || !author || !category || !total_copies) {
      return response.status(400).json({
        success: false,
        message: "Required fields are missing"
      });
    }

    const totalCopies = Number(total_copies);

    if (totalCopies < 1) {
      return response.status(400).json({
        success: false,
        message: "Total copies must be at least 1"
      });
    }

    const book = await get("SELECT * FROM books WHERE id = ?", [bookId]);

    if (!book) {
      return response.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    const issuedCopies = Number(book.total_copies) - Number(book.available_copies);

    if (totalCopies < issuedCopies) {
      return response.status(400).json({
        success: false,
        message: "Total copies cannot be less than currently issued copies"
      });
    }

    const availableCopies = totalCopies - issuedCopies;

    await run(
      `UPDATE books
       SET title = ?, author = ?, category = ?, total_copies = ?, available_copies = ?,
           shelf_location = ?, description = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        title.trim(),
        author.trim(),
        category.trim(),
        totalCopies,
        availableCopies,
        shelf_location ? shelf_location.trim() : "",
        description ? description.trim() : "",
        bookId
      ]
    );

    return response.json({
      success: true,
      message: "Book updated successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to update book"
    });
  }
}

async function deleteBook(request, response) {
  try {
    const bookId = Number(request.params.id);

    if (!bookId) {
      return response.status(400).json({
        success: false,
        message: "Invalid book id"
      });
    }

    const book = await get("SELECT id FROM books WHERE id = ?", [bookId]);

    if (!book) {
      return response.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    const activeIssue = await get(
      "SELECT id FROM issue_records WHERE book_id = ? AND status = 'issued' LIMIT 1",
      [bookId]
    );

    if (activeIssue) {
      return response.status(400).json({
        success: false,
        message: "Book cannot be deleted because it is currently issued"
      });
    }

    await run("DELETE FROM books WHERE id = ?", [bookId]);

    return response.json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Failed to delete book"
    });
  }
}

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
