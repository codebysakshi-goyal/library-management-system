document.addEventListener("DOMContentLoaded", () => {
  const pageName = document.body.dataset.page;
  const currentUser = getCurrentUser();

  if ((pageName === "login" || pageName === "register") && currentUser) {
    redirectToDashboardByRole(currentUser.role);
    return;
  }

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showMessage("messageBox", "", "success");

      const formData = new FormData(loginForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const result = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        saveAuthData(result.token, result.user);
        redirectToDashboardByRole(result.user.role);
      } catch (error) {
        showMessage("messageBox", error.message, "error");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      showMessage("messageBox", "", "success");

      const formData = new FormData(registerForm);
      const payload = Object.fromEntries(formData.entries());

      if (payload.password.length < 6) {
        showMessage("messageBox", "Password must be at least 6 characters", "error");
        return;
      }

      try {
        const result = await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify(payload)
        });

        showMessage("messageBox", result.message, "success");
        registerForm.reset();
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
      } catch (error) {
        showMessage("messageBox", error.message, "error");
      }
    });
  }
});
