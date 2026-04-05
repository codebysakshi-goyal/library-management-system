function getDefaultDueDate() {
  const today = new Date();
  today.setDate(today.getDate() + 14);
  return today.toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  const dueDateInput = document.getElementById("dueDateInput");
  dueDateInput.min = new Date().toISOString().split("T")[0];
  dueDateInput.value = getDefaultDueDate();

  try {
    const [studentsResult, booksResult] = await Promise.all([
      apiRequest("/users/students"),
      apiRequest("/books")
    ]);

    const students = studentsResult.students || [];
    const books = booksResult.books || [];

    document.getElementById("studentSelect").innerHTML = `
      <option value="">Select Student</option>
      ${students.map((student) => `<option value="${student.id}">${student.full_name} (${student.roll_number})</option>`).join("")}
    `;

    document.getElementById("bookSelect").innerHTML = `
      <option value="">Select Book</option>
      ${books
        .map(
          (book) =>
            `<option value="${book.id}" ${book.available_copies < 1 ? "disabled" : ""}>${book.title} (${book.available_copies} available)</option>`
        )
        .join("")}
    `;
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }

  document.getElementById("issueForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    if (payload.due_date < new Date().toISOString().split("T")[0]) {
      showMessage("messageBox", "Due date should not be before today", "error");
      return;
    }

    try {
      const result = await apiRequest("/issues", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      showMessage("messageBox", result.message, "success");
      event.target.reset();
      dueDateInput.value = getDefaultDueDate();
    } catch (error) {
      showMessage("messageBox", error.message, "error");
    }
  });
});
