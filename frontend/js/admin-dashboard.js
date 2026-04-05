document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  try {
    const [booksResult, studentsResult, issuesResult] = await Promise.all([
      apiRequest("/books"),
      apiRequest("/users/students"),
      apiRequest("/issues")
    ]);

    const books = booksResult.books || [];
    const students = studentsResult.students || [];
    const issues = issuesResult.issues || [];
    const totalAvailableBooks = books.reduce(
      (sum, book) => sum + Number(book.available_copies),
      0
    );

    document.getElementById("summaryCards").innerHTML = `
      <div class="summary-card"><h3>Total Books</h3><p>${books.length}</p></div>
      <div class="summary-card"><h3>Total Students</h3><p>${students.length}</p></div>
      <div class="summary-card"><h3>Total Issued Books</h3><p>${issues.filter((issue) => issue.status === "issued").length}</p></div>
      <div class="summary-card"><h3>Total Available Books</h3><p>${totalAvailableBooks}</p></div>
    `;

    const recentBooks = books.slice(0, 5);
    const recentIssues = issues.slice(0, 5);

    document.getElementById("recentBooksList").innerHTML = recentBooks.length
      ? `<ul class="styled-list">${recentBooks
          .map(
            (book) => `
              <li>
                <strong>${book.title}</strong>
                <div class="muted-text">${book.author} | ${book.category}</div>
              </li>
            `
          )
          .join("")}</ul>`
      : `<p class="empty-state">No books found</p>`;

    document.getElementById("recentIssuesList").innerHTML = recentIssues.length
      ? `<ul class="styled-list">${recentIssues
          .map(
            (issue) => `
              <li>
                <strong>${issue.student_name}</strong>
                <div class="muted-text">${issue.book_title} | Due ${formatDate(issue.due_date)}</div>
              </li>
            `
          )
          .join("")}</ul>`
      : `<p class="empty-state">No issued books found</p>`;
  } catch (error) {
    showMessage("dashboardMessage", error.message, "error");
  }
});
