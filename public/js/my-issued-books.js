document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("student");

  if (!user) {
    return;
  }

  try {
    const result = await apiRequest("/issues/my");
    const issues = result.issues || [];
    const tableBody = document.getElementById("myIssuesTableBody");

    if (!issues.length) {
      tableBody.innerHTML = `<tr><td colspan="8">No issued books found</td></tr>`;
      return;
    }

    tableBody.innerHTML = issues
      .map(
        (issue) => `
          <tr>
            <td>${issue.book_title}</td>
            <td>${issue.author}</td>
            <td>${issue.category}</td>
            <td>${formatDate(issue.issue_date)}</td>
            <td>${formatDate(issue.due_date)}</td>
            <td>${formatDate(issue.return_date)}</td>
            <td>${issue.status === "issued" ? createBadge("Issued", "issued") : createBadge("Returned", "returned")}</td>
            <td>${issue.overdue ? createBadge("Overdue", "overdue") : "-"}</td>
          </tr>
        `
      )
      .join("");
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
});
