document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  const bookId = getQueryParam("id");
  const form = document.getElementById("editBookForm");

  if (!bookId) {
    showMessage("messageBox", "Invalid book id", "error");
    return;
  }

  try {
    const result = await apiRequest(`/books/${bookId}`);
    const book = result.book;

    form.title.value = book.title;
    form.author.value = book.author;
    form.category.value = book.category;
    form.total_copies.value = book.total_copies;
    form.shelf_location.value = book.shelf_location || "";
    form.description.value = book.description || "";
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const result = await apiRequest(`/books/${bookId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });

      showMessage("messageBox", result.message, "success");
    } catch (error) {
      showMessage("messageBox", error.message, "error");
    }
  });
});
