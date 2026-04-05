async function loadIssueRecords() {
  try {
    const result = await apiRequest("/issues");
    const issues = result.issues || [];
    const tableBody = document.getElementById("issueRecordsTableBody");

    if (!issues.length) {
      tableBody.innerHTML = `<tr><td colspan="8">No issued books found</td></tr>`;
      return;
    }

    tableBody.innerHTML = issues
      .map(
        (issue) => `
          <tr>
            <td>${issue.student_name}</td>
            <td>${issue.book_title}</td>
            <td>${formatDate(issue.issue_date)}</td>
            <td>${formatDate(issue.due_date)}</td>
            <td>${formatDate(issue.return_date)}</td>
            <td>${issue.status === "issued" ? createBadge("Issued", "issued") : createBadge("Returned", "returned")}</td>
            <td>${issue.overdue ? createBadge("Overdue", "overdue") : "-"}</td>
            <td>${issue.status === "issued" ? `<button class="btn btn-primary" onclick="returnBook(${issue.id})">Return</button>` : "-"}</td>
          </tr>
        `
      )
      .join("");
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
}

async function returnBook(issueId) {
  try {
    const result = await apiRequest(`/issues/${issueId}/return`, {
      method: "PUT"
    });

    showMessage("messageBox", result.message, "success");
    loadIssueRecords();
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  loadIssueRecords();
});
