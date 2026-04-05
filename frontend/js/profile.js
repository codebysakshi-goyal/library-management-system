document.addEventListener("DOMContentLoaded", async () => {
  const user = requireAuth();

  if (!user) {
    return;
  }

  const form = document.getElementById("profileForm");
  const submitButton = document.getElementById("profileSubmitButton");

  try {
    const result = await apiRequest("/auth/me");
    const profile = result.user;

    form.full_name.value = profile.full_name || "";
    form.email.value = profile.email || "";
    form.roll_number.value = profile.roll_number || "";
    form.course.value = profile.course || "";
    form.phone_number.value = profile.phone_number || "";

    if (profile.role === "admin") {
      form.course.disabled = true;
      form.phone_number.disabled = true;
      submitButton.style.display = "none";
    }
  } catch (error) {
    showMessage("messageBox", error.message, "error");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (user.role !== "student") {
      return;
    }

    const formData = new FormData(form);
    const payload = {
      full_name: formData.get("full_name"),
      course: formData.get("course"),
      phone_number: formData.get("phone_number")
    };

    try {
      const result = await apiRequest("/users/profile", {
        method: "PUT",
        body: JSON.stringify(payload)
      });

      saveAuthData(getToken(), result.user);
      showMessage("messageBox", result.message, "success");
    } catch (error) {
      showMessage("messageBox", error.message, "error");
    }
  });
});
