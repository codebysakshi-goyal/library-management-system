document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  try {
    const result = await apiRequest("/users/students");
    const students = result.students || [];
    const tableBody = document.getElementById("studentsTableBody");

    if (!students.length) {
      tableBody.innerHTML = `<tr><td colspan="7">No students found</td></tr>`;
      return;
    }

    tableBody.innerHTML = students
      .map(
        (student) => `
          <tr>
            <td>${student.full_name}</td>
            <td>${student.email}</td>
            <td>${student.roll_number}</td>
            <td>${student.course}</td>
            <td>${student.phone_number}</td>
            <td>${student.status}</td>
            <td><a class="btn btn-secondary" href="student-details.html?id=${student.id}">View</a></td>
          </tr>
        `
      )
      .join("");
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }
});
