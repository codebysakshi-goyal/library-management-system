async function loadStudentBooks(search = "", category = "") {
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
    const booksGrid = document.getElementById("studentBooksGrid");

    if (!books.length) {
      booksGrid.innerHTML = `<p class="empty-state">No books found</p>`;
      return;
    }

    booksGrid.innerHTML = books
      .map(
        (book) => `
          <article class="book-card">
            <h2>${book.title}</h2>
            <p class="book-meta">${book.author} | ${book.category}</p>
            <p>ISBN: ${book.isbn}</p>
            <p>${book.available_copies > 0 ? createBadge("Available", "available") : createBadge("Not Available", "unavailable")}</p>
            <a class="btn btn-primary" href="book-details.html?id=${book.id}">View Details</a>
          </article>
        `
      )
      .join("");
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = requireAuth("student");

  if (!user) {
    return;
  }

  loadStudentBooks();

  document.getElementById("studentBookSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    loadStudentBooks(formData.get("search"), formData.get("category"));
  });

  document.getElementById("resetBookFilters").addEventListener("click", () => {
    document.getElementById("studentBookSearchForm").reset();
    loadStudentBooks();
  });
});
