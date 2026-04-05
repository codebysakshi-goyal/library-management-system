document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("student");

  if (!user) {
    return;
  }

  const bookId = getQueryParam("id");

  if (!bookId) {
    showMessage("messageBox", "Invalid book id", "error");
    return;
  }

  try {
    const result = await apiRequest(`/books/${bookId}`);
    const book = result.book;

    document.getElementById("bookDetailsCard").innerHTML = `
      <h1>${book.title}</h1>
      <p class="section-subtitle">Complete information about the selected library book</p>
      <div class="detail-grid">
        <div class="detail-item"><span>Author</span><strong>${book.author}</strong></div>
        <div class="detail-item"><span>Category</span><strong>${book.category}</strong></div>
        <div class="detail-item"><span>ISBN</span><strong>${book.isbn}</strong></div>
        <div class="detail-item"><span>Shelf Location</span><strong>${book.shelf_location || "-"}</strong></div>
      </div>
      <div class="inner-panel">
        <h2>Description</h2>
        <p>${book.description || "No description available"}</p>
        <p><strong>Availability:</strong> ${book.available_copies > 0 ? createBadge("Available", "available") : createBadge("Not Available", "unavailable")}</p>
      </div>
    `;
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
});
