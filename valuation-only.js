function submitValuationOnly() {
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  if (!first || !last || !email || !mobile) {
    alert("Please fill in all fields.");
    return;
  }

  // Save to localStorage for later use
  localStorage.setItem("firstName", first);
  localStorage.setItem("lastName", last);
  localStorage.setItem("email", email);
  localStorage.setItem("mobile", mobile);

  // Redirect to results page
  window.location.href = "results.html";
}
