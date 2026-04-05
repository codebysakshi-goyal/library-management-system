async function loadAdminBooks(search = "", category = "") {
  try {
    const query = new URLSearchParams();

    if (search) {
      query.append("search", search);
    }

    if (category) {
      query.append("category", category);
    }

    const result = await apiRequest(`/books?${query.toString()}`);
    const books = result.books || [];
    const tableBody = document.getElementById("booksTableBody");

    if (!books.length) {
      tableBody.innerHTML = `<tr><td colspan="8">No books found</td></tr>`;
      return;
    }

    tableBody.innerHTML = books
      .map(
        (book) => `
          <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td>${book.isbn}</td>
            <td>${book.total_copies}</td>
            <td>${book.available_copies}</td>
            <td>${book.available_copies > 0 ? createBadge("Available", "available") : createBadge("Not Available", "unavailable")}</td>
            <td>
              <a class="btn btn-secondary" href="edit-book.html?id=${book.id}">Edit</a>
              <button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </td>
          </tr>
        `
      )
      .join("");
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
}

async function deleteBook(bookId) {
  const confirmed = window.confirm("Are you sure you want to delete this book?");

  if (!confirmed) {
    return;
  }

  try {
    const result = await apiRequest(`/books/${bookId}`, {
      method: "DELETE"
    });

    showMessage("messageBox", result.message, "success");
    loadAdminBooks();
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  loadAdminBooks();

  document.getElementById("bookSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    loadAdminBooks(formData.get("search"), formData.get("category"));
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("bookSearchForm").reset();
    loadAdminBooks();
  });
});
