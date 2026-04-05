document.addEventListener("DOMContentLoaded", () => {
  const user = requireAuth("admin");

  if (!user) {
    return;
  }

  document.getElementById("bookForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    if (Number(payload.total_copies) < 1) {
      showMessage("messageBox", "Total copies must be a positive number", "error");
      return;
    }

    try {
      const result = await apiRequest("/books", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      showMessage("messageBox", result.message, "success");
      event.target.reset();
    } catch (error) {
      showMessage("messageBox", error.message, "error");
    }
  });
});
