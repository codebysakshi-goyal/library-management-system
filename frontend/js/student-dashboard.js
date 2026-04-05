document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("student");

  if (!user) {
    return;
  }

  document.getElementById("studentWelcome").textContent = `Welcome, ${user.full_name}`;

  try {
    const result = await apiRequest("/issues/my");
    const issues = result.issues || [];
    const activeIssues = issues.filter((issue) => issue.status === "issued");
    const overdueIssues = activeIssues.filter((issue) => issue.overdue);

    document.getElementById("studentSummary").innerHTML = `
      <div class="summary-card"><h3>Total Issued Books</h3><p>${activeIssues.length}</p></div>
      <div class="summary-card"><h3>Overdue Books</h3><p>${overdueIssues.length}</p></div>
      <div class="summary-card"><h3>Returned Books</h3><p>${issues.filter((issue) => issue.status === "returned").length}</p></div>
      <div class="summary-card"><h3>My Role</h3><p>Student</p></div>
    `;

    document.getElementById("studentCurrentIssues").innerHTML = activeIssues.length
      ? `<ul class="styled-list">${activeIssues
          .map(
            (issue) =>
              `<li>
                <strong>${issue.book_title}</strong>
                <div class="muted-text">Due: ${formatDate(issue.due_date)} ${issue.overdue ? "| Overdue" : "| On time"}</div>
              </li>`
          )
          .join("")}</ul>`
      : `<p class="empty-state">No issued books found</p>`;
  } catch (error) {
    document.getElementById("studentCurrentIssues").innerHTML = `<p class="empty-state">${error.message}</p>`;
  }
});
