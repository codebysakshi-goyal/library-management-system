document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  const studentId = getQueryParam("id");

  if (!studentId) {
    showMessage("messageBox", "Invalid student id", "error");
    return;
  }

  try {
    const result = await apiRequest(`/users/students/${studentId}`);
    const student = result.student;
    const issueRecords = result.issueRecords || [];

    document.getElementById("studentInfo").innerHTML = `
      <h1>${student.full_name}</h1>
      <p class="section-subtitle">Basic student profile and borrowing information</p>
      <div class="detail-grid">
        <div class="detail-item"><span>Email</span><strong>${student.email}</strong></div>
        <div class="detail-item"><span>Roll Number</span><strong>${student.roll_number}</strong></div>
        <div class="detail-item"><span>Course</span><strong>${student.course}</strong></div>
        <div class="detail-item"><span>Phone Number</span><strong>${student.phone_number}</strong></div>
      </div>
    `;

    document.getElementById("studentIssueTableBody").innerHTML = issueRecords.length
      ? issueRecords
          .map(
            (record) => `
              <tr>
                <td>${record.title}</td>
                <td>${formatDate(record.issue_date)}</td>
                <td>${formatDate(record.due_date)}</td>
                <td>${formatDate(record.return_date)}</td>
                <td>${record.status === "issued" ? createBadge("Issued", "issued") : createBadge("Returned", "returned")}</td>
              </tr>
            `
          )
          .join("")
      : `<tr><td colspan="5">No issued books found</td></tr>`;
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
});
