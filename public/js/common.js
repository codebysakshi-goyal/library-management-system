function getPageName() {
  return document.body.dataset.page;
}

function isActivePage(pageNames) {
  return pageNames.includes(getPageName());
}

function showMessage(elementId, message, type) {
  const element = document.getElementById(elementId);

  if (!element) {
    return;
  }

  if (!message) {
    element.innerHTML = "";
    return;
  }

  element.innerHTML = `<div class="message message-${type}">${message}</div>`;
}

function createBadge(text, type) {
  return `<span class="badge badge-${type}">${text}</span>`;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Date(dateValue).toLocaleDateString("en-IN");
}

function getQueryParam(name) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(name);
}

function redirectToDashboardByRole(role) {
  if (role === "admin") {
    window.location.href = "admin-dashboard.html";
    return;
  }

  window.location.href = "student-dashboard.html";
}

function requireAuth(requiredRole) {
  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    window.location.href = "unauthorized.html";
    return null;
  }

  return user;
}

function renderNavbar() {
  const navbar = document.getElementById("navbar");

  if (!navbar) {
    return;
  }

  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const guestHomeClass = isActivePage(["home"]) ? "active-link" : "";
  const guestLoginClass = isActivePage(["login"]) ? "active-link" : "";
  const guestRegisterClass = isActivePage(["register"]) ? "active-link" : "";
  let links = `
    <a href="index.html" class="${guestHomeClass}">Home</a>
    <a href="login.html" class="${guestLoginClass}">Login</a>
    <a href="register.html" class="${guestRegisterClass}">Register</a>
  `;

  if (user && user.role === "student") {
    const dashboardClass = isActivePage(["student-dashboard"]) ? "active-link" : "";
    const booksClass = isActivePage(["student-books", "book-details"]) ? "active-link" : "";
    const issuesClass = isActivePage(["my-issued-books"]) ? "active-link" : "";
    const profileClass = isActivePage(["profile"]) ? "active-link" : "";

    links = `
      <a href="student-dashboard.html" class="${dashboardClass}">Dashboard</a>
      <a href="student-books.html" class="${booksClass}">Books</a>
      <a href="my-issued-books.html" class="${issuesClass}">My Issued Books</a>
      <a href="profile.html" class="${profileClass}">Profile</a>
      <button type="button" id="logoutButton">Logout</button>
    `;
  }

  if (user && user.role === "admin") {
    const dashboardClass = isActivePage(["admin-dashboard"]) ? "active-link" : "";
    const booksClass = isActivePage(["admin-books", "add-book", "edit-book"]) ? "active-link" : "";
    const studentsClass = isActivePage(["students", "student-details"]) ? "active-link" : "";
    const issueBookClass = isActivePage(["issue-book"]) ? "active-link" : "";
    const issueRecordsClass = isActivePage(["issued-records"]) ? "active-link" : "";
    const profileClass = isActivePage(["profile"]) ? "active-link" : "";

    links = `
      <a href="admin-dashboard.html" class="${dashboardClass}">Dashboard</a>
      <a href="admin-books.html" class="${booksClass}">Books</a>
      <a href="students.html" class="${studentsClass}">Students</a>
      <a href="issue-book.html" class="${issueBookClass}">Issue Book</a>
      <a href="issued-records.html" class="${issueRecordsClass}">Issued Records</a>
      <a href="profile.html" class="${profileClass}">Profile</a>
      <button type="button" id="logoutButton">Logout</button>
    `;
  }

  navbar.innerHTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="index.html">
          <img src="assets/logo.png" alt="College Logo" class="brand-logo">
          <div class="brand-text">
            <span class="brand-title">Post Graduate Government College for Girls</span>
            <span class="brand-subtitle">Sector-11, Chandigarh</span>
          </div>
        </a>
        <nav class="nav-links">${links}</nav>
      </div>
    </header>
  `;

  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearAuthData();
      window.location.href = "login.html";
    });
  }
}

function renderFooter() {
  const footer = document.getElementById("footer");

  if (!footer) {
    return;
  }

  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-content">
        <p>Campus Library Management System 2026</p>
        <p>Post Graduate Government College for Girls, Sector-11, Chandigarh</p>
        <p>Project by Sakshi Goyal</p>
        <p>Roll No.: 1076/23, BCA - 6th Semester</p>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
});
