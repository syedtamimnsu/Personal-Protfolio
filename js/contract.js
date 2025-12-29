document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.contactform");
  if (!form) return;

  const output = form.querySelector(".output_message");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (output) output.textContent = "";
    if (submitBtn) submitBtn.disabled = true;

    try {
      const formData = new FormData(form);

      const res = await fetch(form.getAttribute("action"), {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // ✅ parse JSON

      if (data.success) {
        output.textContent = data.message || "Message sent successfully!";
        form.reset();
        } else {
        output.textContent = data.message || "Sorry! Message not sent. Try again.";
        }

    } catch (err) {
      if (output) output.textContent = "Network error. Please try again.";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
