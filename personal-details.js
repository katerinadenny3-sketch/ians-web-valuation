/* ========================= */
/* AUTO-FILL FOR TEST MODE  */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const reg = (localStorage.getItem("reg") || "").toUpperCase();
  const selected = localStorage.getItem("selectedOption");

  // Test mode SPZ
  if (reg === "SL15NCA" || reg === "SL18NCA") {
    autoFillForm(selected);
  }
});

function autoFillForm(journey) {
  // Journey 1 → only personal details
  if (journey === "valuation-only") {
    document.getElementById("firstName").value = "John";
    document.getElementById("lastName").value = "Smith";
    document.getElementById("email").value = "john.smith@test.com";
    document.getElementById("mobile").value = "07123456789";
  }
}

/* ========================= */
/* ORIGINAL SUBMIT LOGIC     */
/* ========================= */

function submitDetails() {
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if (!first || !last || !email || !mobile) {
    alert("Please fill in all fields.");
    return;
  }

  localStorage.setItem("firstName", first);
  localStorage.setItem("lastName", last);
  localStorage.setItem("email", email);
  localStorage.setItem("mobile", mobile);

  window.location.href = "results.html";
}
